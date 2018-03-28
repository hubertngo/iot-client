/* --------------------------------------------------------
* Author Lê Quang Thịnh
* Email lqthinh93@gmail.com
* Phone 0937341717
*
* Created: 2018-03-28 10:00:30
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';

import { Modal } from 'antd';

import EditUserInfoForm from 'src/components/Form/EditUserInfo';

import { toggleEditUserInfoModal, toggleUserInfoModal } from 'src/redux/actions/modal';

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
			toggleEditUserInfoModal,
			toggleUserInfoModal,
		}, dispatch),
	};
};

const EditUserInfoModal = (props) => {
	const { classes, store: { modal: { editUserInfo } } } = props;

	return (
		<Modal
			visible={editUserInfo.open}
			closable={editUserInfo.closable}
			footer={null}
			bodyStyle={{ padding: 0 }}
			className={classes.root}
			wrapClassName={classes.wrap}
			width="auto"
			destroyOnClose
			onCancel={editUserInfo.closable ? f => f : () => props.action.toggleEditUserInfoModal({ open: false })}
		>
			<EditUserInfoForm />
		</Modal>
	);
};

EditUserInfoModal.propTypes = {
	classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		modal: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		toggleEditUserInfoModal: PropTypes.func.isRequired,
		toggleUserInfoModal: PropTypes.func.isRequired,
	}).isRequired,
};

EditUserInfoModal.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(EditUserInfoModal));
