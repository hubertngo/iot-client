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

import EditSellingForm from 'src/components/Form/TicketPoster/EditSelling';

import { toggleEditSellingModal } from 'src/redux/actions/modal';

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
			toggleEditSellingModal,
		}, dispatch),
	};
};

const EditSellingModal = (props) => {
	const { classes, store: { modal: { editSelling } } } = props;
	return (
		<Modal
			// title="Basic Modal"
			visible={editSelling.open}
			closable={editSelling.closable}
			footer={null}
			bodyStyle={{ padding: 0 }}
			className={classes.root}
			wrapClassName={classes.wrap}
			width={450}
			destroyOnClose
			onCancel={editSelling.closable ? f => f : () => props.action.toggleEditSellingModal({ open: false })}
		>
			<EditSellingForm />
		</Modal>
	);
};

EditSellingModal.propTypes = {
	classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		modal: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		toggleEditSellingModal: PropTypes.func.isRequired,
	}).isRequired,
};

EditSellingModal.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(EditSellingModal));
