/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 14:05:13
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';

import { Modal } from 'antd';

import FlightDetail from 'src/components/Flight/Card/Detail';

import { toggleFlightModal } from 'src/redux/actions/modal';

const styleSheet = (/* theme */) => ({
	wrap: {
		textAlign: 'center',
	},
	root: {
		display: 'inline-block',
		'& .ant-modal-close': {
			display: 'none',
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			modal: state.get('modal').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleFlightModal,
		}, dispatch),
	};
};

const FlightModal = (props) => {
	const { classes, store: { modal: { flight } } } = props;

	return (
		<Modal
			// title="Basic Modal"
			visible={flight.open}
			closable={flight.closable}
			footer={null}
			bodyStyle={{ padding: 0 }}
			className={classes.root}
			wrapClassName={classes.wrap}
			destroyOnClose
			onCancel={flight.closable ? f => f : () => props.action.toggleFlightModal({ open: false })}
		>
			{flight.data ? <FlightDetail flightData={flight.data} type={flight.type} /> : null }
		</Modal>
	);
};

FlightModal.propTypes = {
	classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		modal: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		toggleFlightModal: PropTypes.func.isRequired,
	}).isRequired,
};

FlightModal.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(FlightModal));
