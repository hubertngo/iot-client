/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-15 15:06:09
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';
import { Button, Input, Select, DatePicker } from 'antd';

const styleSheet = (/* theme */) => ({
	root: {
		width: 500,
		margin: '50px auto',
		background: '#fff',
		padding: 30,
	},
});

function mapStateToProps(state) {
	return {
		store: {
			// modal: state.modal,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		// action: bindActionCreators({
			// toggleLoginModal,
		// }, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
export default class ClassName extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleLoginModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Button type="primary" size="small" style={{ marginRight: 20 }}>primary</Button>
				<Button type="primary" style={{ marginRight: 20 }}>primary</Button>
				<Button type="primary" size="large" style={{ marginRight: 20 }}>primary</Button>
				<Button type="danger">danger</Button>
				<Input placeholder="Basic usage" size="small" style={{ marginTop: 20 }} />
				<Input placeholder="Basic usage" style={{ marginTop: 20 }} />
				<Input placeholder="Basic usage" size="large" style={{ marginTop: 20 }} />
				<Input.TextArea rows={4} placeholder="Basic usage" style={{ marginTop: 20 }} />
				<DatePicker style={{ width: '60%', marginTop: 20 }} />
				<Select defaultValue="lucy" size="small" style={{ width: '60%', marginTop: 20 }}>
					<Select.Option value="jack">Jack</Select.Option>
					<Select.Option value="lucy">Lucy</Select.Option>
					<Select.Option value="disabled" disabled>Disabled</Select.Option>
					<Select.Option value="Yiminghe">yiminghe</Select.Option>
				</Select>
				<Select defaultValue="lucy" style={{ width: '60%', marginTop: 20 }}>
					<Select.Option value="jack">Jack</Select.Option>
					<Select.Option value="lucy">Lucy</Select.Option>
					<Select.Option value="disabled" disabled>Disabled</Select.Option>
					<Select.Option value="Yiminghe">yiminghe</Select.Option>
				</Select>
				<Select defaultValue="lucy" size="large" style={{ width: '60%', marginTop: 20 }}>
					<Select.Option value="jack">Jack</Select.Option>
					<Select.Option value="lucy">Lucy</Select.Option>
					<Select.Option value="disabled" disabled>Disabled</Select.Option>
					<Select.Option value="Yiminghe">yiminghe</Select.Option>
				</Select>

			</div>
		);
	}
}
