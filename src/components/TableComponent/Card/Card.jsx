import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './Card.less';


const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
			parentId: props.parentId
		};
	},
};

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		let hoverIndex = props.index;
		const dragParent = monitor.getItem().parentId;
		const hoverParent = props.parentId;

		// Don't replace items with themselves in one box
		if (dragIndex === hoverIndex) {
			if (dragParent !== hoverParent) {
				hoverIndex++;
			} else {
				return;
			}
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;


		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex, dragParent, hoverParent);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
};

@DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Card extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		text: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
		deleteCard: PropTypes.func.isRequired
	};

	handlerClick = (e) => {
		e.preventDefault();
		this.props.deleteCard();
	};

	render() {
		const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div className='cardDraggable' style={{opacity}}>
				<span>{text}</span>
				<span onClick={this.handlerClick} className='cardDelete'/>
			</div>
		));
	}
}