/* --------------------------------------------------------
* Author Lê Quang Thịnh
* Email lqthinh93@gmail.com
* Phone 0937341717
*
* Created: 2018-03-28 10:00:30
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Icon, Row, Col, Divider } from 'antd';
import Avatar from 'src/components/Photo/Avatar';
import GroupStar from 'src/components/Flight/Card/GroupStar';

import withStyles from 'src/theme/jss/withStyles';

import { toggleEditUserInfoModal, toggleUserInfoModal } from 'src/redux/actions/modal';

const styleSheet = (theme) => ({
	root: {
		minWidth: 393,
		position: 'relative',
		textAlign: 'left',
		padding: 20,
	},
	header: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginBottom: 20,
	},
	closeBtn: {
		position: 'absolute',
		right: 10,
		top: 10,
		fontSize: '20px',
		cursor: 'pointer',
	},
	infoRow: {
		marginBottom: 8,
		color: '#95A2AB',
		'& span': {
			marginRight: 10,
		},
	},
	rightCol: {
		textAlign: 'right',
	},
	link: {
		color: '#4368C4',
		cursor: 'pointer',
		'& span': {
			marginLeft: 8,
		},
	},
	divider: {
		margin: '20px 0 10px 0',
		top: '0',
	},
	hisTitle: {
		color: '#95A2AB',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	hisRow: {
		margin: '10px 0 10px 0',
	},
	note: {
		color: theme.palette.text.disabled,
		fontWeight: 500,
	},
	hislink: {
		color: theme.palette.primary[500],
		maxWidth: 350,
		overflow: 'hidden',
		textOverflow: 'ellipsic',

		'& > i': {
			marginRight: 5,
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
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

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class LoginForm extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		style: PropTypes.object,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleEditUserInfoModal,
			toggleUserInfoModal,
		}).isRequired,
	}

	render() {
		const { form: { getFieldDecorator }, classes, style, store, action } = this.props;
		const content = 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018';
		const	updatedTime = '12/02/2018 16:08';
		const	link = 'https://dulichgiare.com.vn/vemaybay/147dqe';
		console.log('store auth', store.auth);
		return (
			<div className={classes.root} style={style}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={() => action.toggleUserInfoModal({ open: false })} />
				<div className={classes.header}>
					Thông tin cá nhân
				</div>
				<Row className={classes.formItem} type="flex">
					<Col span={4} className={classes.formLabel}>
						<Avatar size={40} src={store.auth.avatar} name={store.auth.fullName} />
					</Col>
					<Col span={13}>
						<h4>{store.auth.fullName}</h4>
						<div className={classes.infoRow}>
							<span> <Icon type="gift" /> </span>
							<span> {store.auth.birthday || ''}</span>
						</div>
						<div className={classes.infoRow}>
							<span> <Icon type="mail" /> </span>
							<span> {store.auth.email} </span>
						</div>
						<div className={classes.infoRow}>
							<span> <Icon type="phone" /> </span>
							<span> {store.auth.phone || ''} </span>
						</div>
					</Col>
					<Col span={7} className={classes.rightCol}>
						<GroupStar rate={3} />
						<div className={classes.infoRow}>
							<div> Ngày tham gia </div>
							<div> 28/03/2018 </div>
						</div>
					</Col>
				</Row>
				<div className={`${classes.rightCol} ${classes.link}`}>
					<span> <Icon type="edit" /> </span>
					<span> Chỉnh sửa </span>
				</div>
				<Divider className={classes.divider} />
				<div className={classes.hisTitle}> Lịch sử giao dịch (2) </div>
				<div className={classes.hisRow}>
					<span className={classes.note}>{updatedTime}</span>
					<div>{content}</div>
					<span className={classes.hislink}>
						<Icon type="link" />
						<a href={link}>{link}</a>
					</span>
				</div>
				<div className={classes.hisRow}>
					<span className={classes.note}>{updatedTime}</span>
					<div>{content}</div>
					<span className={classes.hislink}>
						<Icon type="link" />
						<a href={link}>{link}</a>
					</span>
				</div>
			</div>
		);
	}
}
