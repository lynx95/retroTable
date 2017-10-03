import React, { PropTypes, Component } from 'react';
import update from 'immutability-helper';
import classnames from 'classnames/bind';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'underscore';

import style from './TableComponent.less';
import Card from './Card';

const propTypes = {
	name: PropTypes.string,
	color: PropTypes.string,
	value: PropTypes.string
};

const defaultProps = {
	name: 'Название раздела',
	color: 'blue',
	img: 'default.svg',
	value: ''
};

let cn = classnames.bind(style);

@DragDropContext(HTML5Backend)
class TableComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const items = nextProps;
		this.setState({
			items
		});
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
			click: false,
			value: ''
		};
	}

	//Todo это в будущем, в процессе
	onChangeName = (name) => {
		console.log(name);
	};


	addNewRow = () => {
		if (this.state.value) {
			const {cards} = this.state;
			const maxIndex = _.max(cards, (card) => card.id);

			cards.push({
				id: maxIndex.id + 1,
				text: this.state.value,
				parentId: this.props.tableId
			});

			this.setState({
				cards,
				value: ''
			});
		}
	};

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

	handleChange = (e) => {
		this.setState({ value: e.target.value });
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
					parentId={card.parentId}
					moveCard={this.moveCard}
				    deleteCard={() => this.deleteCard(card.id)}
				/>
			}
		});

		return (
			<div className={this.getClassName()} style={{backgroundColor: this.props.color, backgroundImage: this.state.img }}>
				<div className='componentName'>{this.state.name}</div>
				<div className='componentBody'>
					<div className='addNewRow'>
						<span className="addRowPlus" onClick={this.addNewRow}>+</span><input type="text" value={this.state.value} className='inputComponent' onChange={this.handleChange} />
					</div>
					<div id={`rowWrap--${this.props.tableId}`}>
						{rows}
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