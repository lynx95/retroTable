import React, { PropTypes, Component } from 'react';
import _ from 'underscore';

@DragDropContext(HTML5Backend)

class Row extends Component {
	constructor(props) {
		super(props);
	}


	deleteCard = (id) => {
		const { cards } = this.state;

		//Todo реальный запрос на удаление из базы
		const updateCards = _.filter(cards, (card) => card.id !== id);
		this.setState({
			cards: updateCards
		});
	};

	moveCard = (dragIndex, hoverIndex, dragParent, hoverParent) => {
		const { cards } = this.state;
		const dragCard = cards[dragIndex];

		if (dragParent !== hoverParent) {
			hoverIndex++;
			dragCard.parentId = hoverParent;
		}

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
		const {cards} = this.state;
		let rows = cards.map((card, i) => {
			if (card.parentId === this.props.tableId) {
				return <Card
					key={card.id}
					index={i}
					id={card.id}
					text={card.text}
					parentId={card.parentId}
					moveCard={this.moveCard}
					deleteCard={() => this.deleteCard(card.id)}
				/>
			}
		});
	}
}

export default Row;