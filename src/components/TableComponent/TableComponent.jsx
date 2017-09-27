import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/bind';

import style from './TableComponent.less';
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

class TableComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.name,
			img: `url(./../../img/${this.props.img})`,
			click: false
		};
	}


	onChangeName = (name) => {
		console.log(name);
	};



	onClickAddNewRow = (data) => {
		console.log(this);
		this.setState({ click: true });
	};

	addNewRow = () => {
		if (this.state.click) {
			this.setState({ click: false });
			return <RowComponent text='Новая сторока' id={this.props.tsbleId}/>;
		}
	};

	//Todo заменить на реальные данные с базы данных
	getDataFromServer = () => {
		return [{
				id: 1,
				text: 'Ништяк все, лучше не бывает!'
			},
			{
				id: 1,
				text: 'Ништяк все, лучше быть не может!'
			},
			{
				id: 2,
				text: 'Есть что поправить'
			},
			{
				id: 3,
				text: 'А почему бы не попробовать'
			},
			{
				id: 4,
				text: 'Подвисло чот'
			}
		]
	};


	render() {
		const data = this.getDataFromServer();

		let rows = data.map((res) => {
			if (res.id === this.props.tableId) {
				return <RowComponent text={res.text}/>
			}
		});

		return (
			<div className={this.getClassName()} style={{backgroundColor: this.props.color, backgroundImage: this.state.img }}>
				<div className='componentName'>{this.state.name}</div>
				<div className='componentBody'>
					<div className='addNewRow' onClick={this.onClickAddNewRow}>+</div>
					<div id={`rowWrap--${this.props.tableId}`}>
						{rows}
						{this.addNewRow()}
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