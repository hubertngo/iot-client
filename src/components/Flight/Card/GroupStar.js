import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

export default class GroupStar extends Component {
	static propTypes = {
		rating: PropTypes.bool,
		rate: PropTypes.number,
		onChange: PropTypes.func,
	}

	static defaultProps = {
		rating: false,
		rate: 0,
		onChange: null,
	}

	state = {
		rate: this.props.rate,
	}

	handleClick = (index) => {
		this.setState({
			rate: index + 1,
		}, () => {
			if (this.props.onChange) {
				this.props.onChange(this.state.rate);
			}
		});
	}

	render() {
		const { rate } = this.state;
		const { rating } = this.props;

		return (
			<div>
				{
					[0, 0, 0, 0, 0].map((item, index) => (
						<Icon
							type="star"
							key={index}
							style={{ color: rate > index ? '#FFB74D' : '#95A2AB', cursor: 'pointer' }}
							onClick={rating ? this.handleClick.bind(this, index) : null}
						/>
					))
				}
			</div>
		);
	}
}

// GroupStar.propTypes = {
// 	rate: PropTypes.number,
// };

// GroupStar.defaultProps = {
// 	rate: 0,
// };

