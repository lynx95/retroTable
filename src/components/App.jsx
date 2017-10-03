import React, { Component } from 'react';
import TableComponent from './TableComponent';
import './App.less';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			innerData: [
				{
					id: 1,
					text: 'Что хорошего?',
					color: '#C2F5BE'
				},
				{
					id: 2,
					text: 'Что плохого?',
					color: '#F6C1C1'
				},
				{
					id: 3,
					text: 'Что можно сделать лучше?',
					color: '#BBDCF3'
				},
				{
					id: 4,
					text: 'Нерешенные вопросы?',
					color: '#F6EBC2'
				}
			]
		};
	}


	render() {
		const { innerData } = this.state;
		let row;
		let cards = innerData.map((card, i) => {
			let component;

			component = <TableComponent name={card.text} color={card.color} tableId={card.id} />

			return component;
		});
		return (
			<div className='App'>
				<div className="retroTableHeader">
					Спринт 21
				</div>

				<div className="retroTableBody">
					{cards}
				</div>
			</div>
		);
	}
}

export default App;