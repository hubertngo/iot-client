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

import EditBuyingForm from 'src/components/Form/TicketPoster/EditBuying';

import { toggleEditBuyingModal } from 'src/redux/actions/modal';

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

		'@media (max-width: 991.98px)': {
			minWidth: 350,
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
			toggleEditBuyingModal,
		}, dispatch),
	};
};

const EditBuyingModal = (props) => {
	const { classes, store: { modal: { editBuying } } } = props;

	return (
		<Modal
			// title="Basic Modal"
			visible={editBuying.open}
			closable={editBuying.closable}
			footer={null}
			bodyStyle={{ padding: 0 }}
			className={classes.root}
			wrapClassName={classes.wrap}
			width={450}
			destroyOnClose
			onCancel={editBuying.closable ? f => f : () => props.action.toggleEditBuyingModal({ open: false })}
		>
			<EditBuyingForm />
		</Modal>
	);
};

EditBuyingModal.propTypes = {
	classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		modal: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		toggleEditBuyingModal: PropTypes.func.isRequired,
	}).isRequired,
};

EditBuyingModal.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(EditBuyingModal));
