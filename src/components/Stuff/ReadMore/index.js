/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-17 00:25:45
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import trimText from './trimText';

export default class ReadMore extends Component {
	static propTypes = {
		children: PropTypes.any.isRequired,
		min: PropTypes.number,
		ideal: PropTypes.number,
		max: PropTypes.number,
		onReadMore: PropTypes.func,
	}

	static defaultProps = {
		min: 50,
		ideal: 200,
		max: 300,
		onReadMore: f => f,
	}

	state = {
		displaySecondary: false,
		primaryText: '',
		secondaryText: '',
	}

	componentWillMount() {
		const args = [
			this.props.children,
			this.props.min,
			this.props.ideal,
			this.props.max,
		];

		const textBreakdown = trimText(...args);
		this.setState({
			primaryText: textBreakdown[0],
			secondaryText: textBreakdown[1],
		});
	}

	componentWillReceiveProps(nextPros) {
		if (nextPros.children !== this.props.children) {
			const args = [
				nextPros.children,
				nextPros.min,
				nextPros.ideal,
				nextPros.max,
			];

			const textBreakdown = trimText(...args);
			this.setState({
				primaryText: textBreakdown[0],
				secondaryText: textBreakdown[1],
			});
		}
	}

	handleReadMore = () => {
		const display = !this.state.displaySecondary;
		this.setState({ displaySecondary: display });
		this.props.onReadMore();
	}

	render() {
		let displayText;
		if (!this.state.secondaryText) {
			displayText = (
				<div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
					{`${this.state.primaryText} ${this.state.secondaryText}`}
				</div>
			);
		} else if (this.state.displaySecondary) {
			/* eslint-disable */
			displayText = (
				<div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }} onClick={this.handleReadMore}>
					{`${this.state.primaryText} ${this.state.secondaryText}`}
				</div>
			);
			/* eslint-enable */
		} else {
			/* eslint-disable */
			displayText = (
				<div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
					{`${this.state.primaryText}`}
					...
					<span
						style={{
							marginLeft: '10px',
							cursor: 'pointer',
							color: '#136259',
						}}
						onClick={this.handleReadMore}
					>
						xem thêm
					</span>
				</div>
			);
			/* eslint-enable */
		}

		return displayText;
	}
}
