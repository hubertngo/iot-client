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

import { toggleEditUserInfoModal, toggleUserInfoModal, toggleRatingModal } from 'src/redux/actions/modal';
import { getUserData } from 'src/redux/actions/user';

import AuthStorage from 'src/utils/AuthStorage';

import moment from 'moment';

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
	rating: {
		'& hover': {
			pointer: 'cursor',
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
			modal: state.get('modal').toJS(),
			userView: state.getIn(['user', 'view']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleEditUserInfoModal,
			toggleUserInfoModal,
			toggleRatingModal,
			getUserData,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class UserInfoForm extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		style: PropTypes.object,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
			modal: PropTypes.object,
			userView: PropTypes.object,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleEditUserInfoModal: PropTypes.func,
			toggleUserInfoModal: PropTypes.func,
			getUserData: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		style: {},
	}

	componentDidMount() {
		this.props.action.getUserData({ id: this.props.store.modal.userInfo.id, filter: { include: 'logs' } });
	}

	chooseToEditInfo() {
		const { action } = this.props;
		action.toggleUserInfoModal({ open: false });
		action.toggleEditUserInfoModal({ open: true, id: this.props.store.userView.id });
	}

	// handleRating = (e) => {
	// 	e.preventDefault();
	// 	const { action } = this.props;
	// 	action.toggleUserInfoModal({ open: false });
	// 	action.toggleRatingModal({ open: true, receiverId: this.props });
	// }

	renderLogItem = (log) => {
		const { classes } = this.props;
		const { ticket } = log;
		const actionText = log.action === 'buy' ? 'Tìm mua' : 'Bán';
		const flightType = ticket.flightType === 'oneWay' ? 'một chiều' : 'khứ hồi';
		const tripText = `${ticket.trip.departure} - ${ticket.trip.destination}`;
		const tripTimeText = moment(ticket.trip.startDate).format('DD/MM/YYYY');
		const tripBackTimeText = ticket.flightType === 'oneWay' ? '' : `, về ngày ${moment(ticket.trip.startDate).format('DD/MM/YYYY')}`;

		const content = `${actionText} vé máy bay ${flightType} ${tripText} bay ngày ${tripTimeText} ${tripBackTimeText}`;
		const link = ticket.dataType === 'fb' ? `https://facebook.com/${ticket.fbFeedId}` : '';

		return (
			<div className={classes.hisRow}>
				<span className={classes.note}>{moment(log.createdAt).format('DD/MM/YYYY HH:mm')}</span>
				<div>{content}</div>
				{
					!!link && (
						<span className={classes.hislink}>
							<Icon type="link" />
							<a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
						</span>
					)
				}
			</div>
		);
	}

	renderLoading() {
		const { classes, style, action } = this.props;

		return (
			<div className={classes.root} style={style}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={() => action.toggleUserInfoModal({ open: false })} />
				<div className={classes.header}>
					Thông tin cá nhân
				</div>
				<Row className={classes.formItem} type="flex">
					<Col span={4} className={classes.formLabel}>
						<Avatar size={40} loading />
					</Col>
					<Col span={13}>
						<div style={{ width: 200 }} className="loading-block" />
						<div className={classes.infoRow}>
							<span> <Icon type="gift" /> </span>
							<span style={{ width: 80 }} className="loading-block" />
						</div>
						<div className={classes.infoRow}>
							<span> <Icon type="mail" /> </span>
							<span style={{ width: 80 }} className="loading-block" />
						</div>
						<div className={classes.infoRow}>
							<span> <Icon type="phone" /> </span>
							<span style={{ width: 80 }} className="loading-block" />
						</div>
					</Col>
					<Col span={7} className={classes.rightCol}>
						<GroupStar rate={3} />
						<div className={classes.infoRow}>
							<div> Ngày tham gia </div>
							<div style={{ width: 80 }} className="loading-block" />
						</div>
					</Col>
				</Row>
				{/* <div className={`${classes.rightCol} ${classes.link}`}>
					<span onClick={() => this.chooseToEditInfo()}> <Icon type="edit" /> </span>
					<span onClick={() => this.chooseToEditInfo()}> Chỉnh sửa </span>
				</div> */}
				<Divider className={classes.divider} />
				<div className={classes.hisTitle}> Lịch sử giao dịch (2) </div>
				<div className={classes.hisRow}>
					<div style={{ width: 150 }} className="loading-block" />
					<div className="loading-block" />
					<div style={{ width: 120 }} className="loading-block" />
				</div>
				<div className={classes.hisRow}>
					<div style={{ width: 150 }} className="loading-block" />
					<div className="loading-block" />
					<div style={{ width: 120 }} className="loading-block" />
				</div>
			</div>
		);
	}

	render() {
		const { classes, style, store: { userView }, action } = this.props;
		const logs = userView.logs || [];
		if (userView.loading && !userView.id) {
			return this.renderLoading();
		}

		return (
			<div className={classes.root} style={style}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={() => action.toggleUserInfoModal({ open: false })} />
				<div className={classes.header}>
					Thông tin cá nhân
				</div>
				<Row className={classes.formItem} type="flex">
					<Col span={4} className={classes.formLabel}>
						<Avatar size={40} src={userView.avatar} name={userView.fullName} />
					</Col>
					<Col span={13}>
						<h4>{userView.fullName}</h4>
						{
							userView.birthday &&
							<div className={classes.infoRow}>
								<span> <Icon type="gift" /> </span>
								<span> {moment(userView.birthday).format('DD/MM/YYYY')}</span>
							</div>
						}

						<div className={classes.infoRow}>
							<span> <Icon type="mail" /> </span>
							<span> {userView.email} </span>
						</div>
						<div className={classes.infoRow}>
							<span> <Icon type="phone" /> </span>
							<span> {userView.phone || ''} </span>
						</div>
					</Col>
					<Col span={7} className={classes.rightCol}>
						<GroupStar ratingsStats={userView.ratingsStats} ratingsCount={userView.ratingsCount} userId={userView.id} />
						<div className={classes.infoRow} style={{ marginTop: 10 }}>
							<div> Ngày tham gia </div>
							<div> {moment(userView.createdAt).format('DD/MM/YYYY')} </div>
						</div>
					</Col>
				</Row>
				{
					AuthStorage.userId === userView.id && (
						<div className={`${classes.rightCol} ${classes.link}`}>
							<span onClick={() => this.chooseToEditInfo()}> <Icon type="edit" /> </span>
							<span onClick={() => this.chooseToEditInfo()}> Chỉnh sửa </span>
						</div>
					)
				}
				<Divider className={classes.divider} />
				<div className={classes.hisTitle}> Lịch sử giao dịch ({logs.length || 0}) </div>
				{
					logs.map(log => (
						this.renderLogItem(log)
					))
				}
			</div>
		);
	}
}
