/* --------------------------------------------------------
* Author Lê Quang Thịnh
* Email lqthinh93@gmail.com
* Phone 0937341717
*
* Created: 2018-03-25 16:52:30
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';

import { Modal } from 'antd';

import TicketPosterForm from 'src/components/Form/TicketPoster';

import { toggleTicketPosterModal } from 'src/redux/actions/modal';

const styleSheet = (/* theme */) => ({
	wrap: {
		textAlign: 'center',
	},
	root: {
		minWidth: 565,
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
			toggleTicketPosterModal,
		}, dispatch),
	};
};

const TicketPosterModal = (props) => {
	const { classes, store: { modal: { ticketPoster } } } = props;

	return (
		<Modal
			visible={ticketPoster.open}
			closable={ticketPoster.closable}
			footer={null}
			bodyStyle={{ padding: 0 }}
			className={classes.root}
			wrapClassName={classes.wrap}
			width="auto"
			destroyOnClose
			onCancel={ticketPoster.closable ? f => f : () => props.action.toggleTicketPosterModal({ open: false })}
		>
			<TicketPosterForm />
		</Modal>
	);
};

TicketPosterModal.propTypes = {
	classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		modal: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		toggleTicketPosterModal: PropTypes.func.isRequired,
	}).isRequired,
};

TicketPosterModal.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(TicketPosterModal));
