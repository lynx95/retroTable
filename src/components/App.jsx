import React, { Component } from 'react';
import TableComponent from './TableComponent';
import './App.less';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='App'>
				<div className="retroTableHeader">
					Спринт 21 // подставить значение спринта
				</div>
				<div className="retroTableBody">
					<div className="retroTableRow">
						<TableComponent name='Что хорошего?' color='#C2F5BE' tableId={1} />
						<TableComponent name='Что плохого?' color='#F6C1C1' tableId={2} />
					</div>
					<div className="retroTableRow">
						<TableComponent name='Что можно сделать лучше?' color='#BBDCF3' tableId={3} />
						<TableComponent name='Нерешенные вопросы' color='#F6EBC2' tableId={4} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;