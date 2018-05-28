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
import { Tabs } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
// import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';
import Container from 'src/components/Layout/Container';

const styleSheet = (theme) => ({
	root: {
		position: 'relative',
		margin: 'auto',
		background: '#FFF',
		zIndex: 1,
		paddingBottom: 20,

		'@media (max-width: 991.98px)': {
			background: 'none',
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			sensorList: state.getIn(['sensor', 'sensorList']),
			selectedSensors: state.getIn(['sensor', 'selectedSensors']),
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
@injectIntl
export default class ClassName extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			sensorList: PropTypes.object.isRequired,
			selectedSensors: PropTypes.arr,
		}).isRequired,
		// // action
		// action: PropTypes.shape({
		// 	toggleLoginModal: PropTypes.func.isRequired,
		// }).isRequired,
	}

	static defaultProps = {}

	render() {
		const { classes, store } = this.props;

		console.log(store.selectedSensors);
		return (
			<div className={classes.root}>

			</div>
		);


	}
}
