import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/bind';
import style from './RowComponent.less';


let cn = classnames.bind(style);

const propTypes = {
	text: PropTypes.string
};

const defaultProps = {
	text: ''
};

class RowComponent extends Component {
	constructor(props) {
		super(props);

	}


	render() {
		return (
			<div className={this.getClassName()}>
				{this.props.text}
			</div>
		);
	}

	getClassName() {
		return cn({
			rowWrapper: true
		});
	}
}

RowComponent.propTypes = propTypes;
RowComponent.defaultProps = defaultProps;

export default RowComponent;