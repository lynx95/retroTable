import React, { Component } from 'react';
import TableComponent from './TableComponent';
import _ from 'underscore';
import './App.less';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			innerData: [
				{
					id: 1,
					text: 'Что хорошего?',
					color: '#C2F5BE',
					cards: [
						{
							id: 1,
							text: 'Ништяк все, лучше не бывает!',
							parentId: 1
						},
						{
							id: 5,
							text: 'Ништяк все, лучше быть не может!',
							parentId: 1
						},
						{
							id: 6,
							text: 'Ништяк все, лучше не бывает!',
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
							text: 'Ништяк все, лучше быть не может!',
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
						}
					]
				},
				{
					id: 2,
					text: 'Что плохого?',
					color: '#F6C1C1',
					cards: [
						{
							id: 2,
							text: 'Есть что поправить',
							parentId: 2
						}
					]
				},
				{
					id: 3,
					text: 'Что можно сделать лучше?',
					color: '#BBDCF3',
					cards: [
						{
							id: 3,
							text: 'А почему бы не попробовать',
							parentId: 3
						}
					]
				},
				{
					id: 4,
					text: 'Нерешенные вопросы?',
					color: '#F6EBC2',
					cards: [
						{
							id: 4,
							text: 'Подвисло чот',
							parentId: 4
						}
					]
				}
			]
		};
	}

	moveCards = (dragIndex, hoverIndex, dragParent, hoverParent) => {
		const { innerData } = this.state;
		const items = _.filter(innerData, (item) => {
			return item.id === dragParent;
		});

		const allcards = _.map(innerData, (id, text, color, cards) => {
			return cards
		});

		console.log(allcards);
		const cardCollection = items[0].cards;

		const dragCard = cardCollection[dragIndex];
		if (dragParent !== hoverParent) {
			console.log(dragCard);
		}
		// this.setState(update(this.state, {
		// 	cards: {
		// 		$splice: [
		// 			[dragIndex, 1],
		// 			[hoverIndex, 0, dragCard],
		// 		],
		// 	},
		// }));
	};


	render() {
		const { innerData } = this.state;
		let items = innerData.map((item, i) => {
			let cardItems = item.cards;
			return <TableComponent name={item.text} color={item.color} tableId={item.id} cards={cardItems} moveCards={this.moveCards} />
		});
		return (
			<div className='App'>
				<div className="retroTableHeader">
					Спринт 21
				</div>

				<div className="retroTableBody">
					{items}
				</div>
			</div>
		);
	}
}

export default App;