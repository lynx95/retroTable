import React, { PropTypes, Component } from 'react';
import update from 'immutability-helper';
import classnames from 'classnames/bind';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import style from './TableComponent.less';
import Card from './Card';
import RowComponent from './RowComponent';

const propTypes = {
	name: PropTypes.string,
	color: PropTypes.string
};

const defaultProps = {
	name: 'Название раздела',
	color: 'blue',
	img: 'default.svg'
};

let cn = classnames.bind(style);

@DragDropContext(HTML5Backend)
class TableComponent extends Component {
	constructor(props) {
		super(props);


	}

	componentWillMount() {
		this.state =  {
			cards: [
				{
					id: 1,
					text: 'Ништяк все, лучше не бывает!',
					parentId: 1
				},
				{
					id: 5,
					text: 'Ништяк все, лучше быть не может456!',
					parentId: 1
				},
				{
					id: 6,
					text: 'Ништяк все, лучше не бывает4!',
					parentId: 1
				},
				{
					id: 7,
					text: 'Ништяк все, лучше быть не может!',
					parentId: 1
				},
				{
					id: 8,
					text: 'Ништяк все, лучше не бывает!',
					parentId: 1
				},
				{
					id: 9,
					text: 'Ништяк все, лучше быть не может!',
					parentId: 1
				},
				{
					id: 10,
					text: 'Ништяк все, лучше не бывает!',
					parentId: 1
				},
				{
					id: 11,
					text: 'Ништяк все, лучше быть не может! 123',
					parentId: 1
				},
				{
					id: 12,
					text: 'Ништяк все, лучше не бывает!',
					parentId: 1
				},
				{
					id: 13,
					text: 'Ништяк все, лучше быть не может!',
					parentId: 1
				},
				{
					id: 2,
					text: 'Есть что поправить',
					parentId: 2
				},
				{
					id: 3,
					text: 'А почему бы не попробовать',
					parentId: 3
				},
				{
					id: 4,
					text: 'Подвисло чот',
					parentId: 4
				}
			],
			name: this.props.name,
			img: `url(./../../img/${this.props.img})`,
			click: false
		};
	}


	onChangeName = (name) => {
		console.log(name);
	};



	onClickAddNewRow = (data) => {
		this.setState({ click: true });
	};

	addNewRow = () => {
		if (this.state.click) {
			this.setState({ click: false });
			return <RowComponent text='Новая сторока' id={this.props.tableId}/>;
		}
	};

	moveCard = (dragIndex, hoverIndex) => {
		console.log(dragIndex, hoverIndex);
		const { cards } = this.state;
		const dragCard = cards[dragIndex];

		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard],
				],
			},
		}));
	};

	render() {
		const { cards } = this.state;
		let rows = cards.map((card, i) => {
			if (card.parentId === this.props.tableId) {
				return <Card
					key={card.id}
					index={i}
					id={card.id}
					text={card.text}
					moveCard={this.moveCard}
				/>
			}
		});

		return (
			<div className={this.getClassName()} style={{backgroundColor: this.props.color, backgroundImage: this.state.img }}>
				<div className='componentName'>{this.state.name}</div>
				<div className='componentBody'>
					<div className='addNewRow' onClick={this.onClickAddNewRow}>+</div>
					<div id={`rowWrap--${this.props.tableId}`}>
						{rows}
						{this.addNewRow}
					</div>
				</div>
			</div>
		);
	}

	getClassName() {
		return cn({
			componentWrapper: true
		});
	}
}

TableComponent.propTypes = propTypes;
TableComponent.defaultProps = defaultProps;

export default TableComponent;