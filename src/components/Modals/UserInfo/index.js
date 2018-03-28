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

import UserInfoForm from 'src/components/Form/UserInfo';

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

const UserInfoModal = (props) => {
	const { classes, store: { modal: { userInfo } } } = props;

	return (
		<Modal
			visible={userInfo.open}
			closable={userInfo.closable}
			footer={null}
			bodyStyle={{ padding: 0 }}
			className={classes.root}
			wrapClassName={classes.wrap}
			width="auto"
			destroyOnClose
			onCancel={userInfo.closable ? f => f : () => props.action.toggleUserInfoModal({ open: false })}
		>
			<UserInfoForm />
		</Modal>
	);
};

UserInfoModal.propTypes = {
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

UserInfoModal.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(UserInfoModal));
