/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-09 17:44:33
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'src/theme/jss/withStyles';

import { Popover, Icon, Divider } from 'antd';

import { Router } from 'src/routes';

import Avatar from 'src/components/Photo/Avatar';
import GroupStar from 'src/components/Flight/Card/GroupStar';

import { logoutRequest } from 'src/redux/actions/auth';
import { toggleUserInfoModal } from 'src/redux/actions/modal';

const styles = (/* theme */) => ({
	avatar: {
		cursor: 'pointer',
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		padding: '15px',
		margin: '-5px -16px -4px',
		background: '#eeeeeea6',
		zIndex: '1',
		position: 'relative',
	},
	info: {
		marginLeft: '10px',
		'& h4': {
			margin: '0',
			lineHeight: '1',
		},
		'& i': {
			fontSize: '12px',
			color: 'rgba(0, 0, 0, 0.45)',
		},
	},
	content: {
		margin: '-12px -16px',
	},
	item: {
		padding: '10px 16px',
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
		'& i': {
			fontSize: '16px',
			marginRight: '15px',
		},
		'&:hover': {
			background: '#eee',
		},
	},
	divider: {
		margin: '0',
		top: '0',
	},
	itemWrapper: {
		padding: '5px 0',
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			logoutRequest,
			toggleUserInfoModal,
		}, dispatch),
	};
};

const AvatarBtn = ({ store, action, classes }) => {
	const logout = () => {
		action.logoutRequest(() => {
			Router.pushRoute('/');
		});
	};

	const content = (
		<div className={classes.content}>
			<div className={classes.itemWrapper}>
				<div className={classes.item}>
					<Icon type="clock-circle-o" />
					<span> Lịch sử giao dịch cá nhân </span>
				</div>
			</div>
			<Divider className={classes.divider} />
			<div className={classes.itemWrapper}>
				<div className={classes.item} onClick={() => action.toggleUserInfoModal({ open: true })}>
					<Icon type="user" />
					<span> Thông tin cá nhân </span>
				</div>
			</div>
			<Divider className={classes.divider} />
			<div className={classes.itemWrapper}>
				{
					store.auth && store.auth.loginType === 'email' &&
						<div className={classes.item} onClick={() => Router.pushRoute('/change-password')}>
							<Icon type="setting" />
							<span> Cài đặt </span>
						</div>
				}
			</div>
			<Divider className={classes.divider} />
			<div className={classes.itemWrapper}>
				<div className={classes.item} onClick={logout}>
					<Icon type="logout" />
					<span> Đăng xuất </span>
				</div>
			</div>
		</div>
	);

	const title = (
		<div className={classes.title}>
			<Avatar size={40} src={store.auth.avatar} name={store.auth.fullName} />
			<div className={classes.info}>
				<h4>{store.auth.fullName}</h4>
				<i>{store.auth.email}</i>
				<GroupStar rate={3} />
			</div>
		</div>
	);

	return (
		<Popover content={content} title={title} trigger="click" placement="bottomRight">
			<Avatar className={classes.avatar} name={store.auth.fullName} src={store.auth.avatar} />
			<Icon type="down" style={{ marginLeft: '5px', fontWeight: 'bold', cursor: 'pointer' }} />
		</Popover>
	);
};

AvatarBtn.propTypes = {
	classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		auth: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		logoutRequest: PropTypes.func.isRequired,
		toggleUserInfoModal: PropTypes.func.isRequired,
	}).isRequired,
};

AvatarBtn.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AvatarBtn));
