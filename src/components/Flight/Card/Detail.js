/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 15:52:03
*------------------------------------------------------- */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Icon, Button, Input, notification, Row, Col, Tag } from 'antd';

import { flightOptions } from 'src/constants/selectOption';
import { getLabel } from 'src/utils';

import withStyles from 'src/theme/jss/withStyles';
import Avatar from 'src/components/Photo/Avatar';
import IconMedal from 'src/components/Photo/IconMedal';
import IconDeparture from 'src/components/Photo/IconDeparture';

import { toggleFlightModal, toggleLoginModal } from 'src/redux/actions/modal';
import { updateTicketBuying } from 'src/redux/actions/ticket-buying';
import { updateTicketSelling } from 'src/redux/actions/ticket-selling';

import AuthStorage from 'src/utils/AuthStorage';

import CheckLogin from 'src/components/Form/CheckLogin';

import TripBlock from './TripBlock';

const styleSheet = (theme) => ({
	root: {
		textAlign: 'left',
		background: '#FFF',
		borderRadius: 8,
		boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.15)',
		marginBottom: 8,
		position: 'relative',

		'&:hover': {
			boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.35)',
		},
	},
	closeBtn: {
		position: 'absolute',
		right: 10,
		top: 10,
		fontSize: '20px',
		cursor: 'pointer',
	},
	header: {
		padding: 20,
		display: 'flex',
		alignItems: 'center',
	},
	author: {
		textTransform: 'uppercase',
		color: theme.palette.text.secondary,
		fontWeight: 600,
		marginRight: 10,
	},
	note: {
		color: theme.palette.text.disabled,
		fontWeight: 500,
	},
	body: {
		padding: '0 20px',
	},
	title: {
		fontWeight: 600,
		textTransform: 'uppercase',
		marginBottom: 5,
	},

	footer: {
		textAlign: 'right',
		padding: 20,
	},

	bidInfo: {
		display: 'flex',
		justifyContent: 'flex-end',

		'& > div': {
			textAlign: 'right',
			marginLeft: 20,
		},
	},

	actionWrapper: {
		textAlign: 'right',

		'& .ant-input-group-wrapper': {
			width: 250,
			padding: '0 15px',
		},
	},

	divider: {
		display: 'block',
		height: 1,
		border: 0,
		borderTop: '1px solid rgba(0, 0, 0, 0.12)',
		marginBottom: '15px',
		padding: 0,
	},

	link: {
		marginTop: 10,
		display: 'inline-block',
	},

	input: {
		width: 280,
		background: theme.palette.text.hint,
		'& + span': {
			background: theme.palette.text.hint,
			border: 0,
		},
	},

	examine: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		color: theme.palette.primary[500],
	},

	blur: {
		opacity: 0.6,
	},
});

function mapStateToProps(state) {
	return {
		// store: {
		// 	flightModal: state.getIn(['modal', 'flight']),
		// },
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleFlightModal,
			toggleLoginModal,
			updateTicketBuying,
			updateTicketSelling,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
export default class FlightDetail extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		flightData: PropTypes.object,
		type: PropTypes.string,
		// store: PropTypes.shape({
		// 	flightModal: PropTypes.object,
		// }).isRequired,
		action: PropTypes.shape({
			updateTicketBuying: PropTypes.func,
			updateTicketSelling: PropTypes.func,
			toggleFlightModal: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		flightData: {},
		type: 'selling',
	}

	state = {
		btnLoading: false,
	}

	handleSell = () => {
		if (this.props.flightData.id) {
			this.setState({
				btnLoading: true,
			});
			this.props.action.updateTicketBuying({
				status: 'pending',
				updatedAt: new Date(),
				id: this.props.flightData.id,
				contactId: AuthStorage.userId,
			}, () => {
				this.setState({
					btnLoading: false,
				});
				notification.success({
					message: 'Chúc mừng!',
					description: 'Bạn đã liên hệ thành công! Vui lòng kiểm tra hộp thư để nhận thông tin người mua.',
				});
				this.props.action.toggleFlightModal({ open: false });
			}, () => {
				this.setState({
					btnLoading: false,
				});
				this.props.action.toggleFlightModal({ open: false });
			});
		}
	}

	handleBuy = () => {
		if (this.props.flightData.id) {
			this.setState({
				btnLoading: true,
			});
			this.props.action.updateTicketSelling({
				status: 'pending',
				updatedAt: new Date(),
				id: this.props.flightData.id,
				contactId: AuthStorage.userId,
			}, () => {
				this.setState({
					btnLoading: false,
				});
				notification.success({
					message: 'Chúc mừng!',
					description: 'Bạn đã mua vé thành công! Vui lòng kiểm tra hộp thư.',
				});
				this.props.action.toggleFlightModal({ open: false });
			}, () => {
				this.setState({
					btnLoading: false,
				});
				this.props.action.toggleFlightModal({ open: false });
			});
		}
	}

	handleClickAvatar = (e) => {
		// e.preventDefault();
		// e.stopPropagation();
		// const { type, creator, buyer, from } = this.props.flightData;

		// if (from) {
		// 	window.open(`https://fb.com/${from.id}`);
		// }
	}

	_renderFooter() {
		const { classes, type, flightData } = this.props;

		if (type === 'buying') {
			return (
				<div className={classes.examine}>
					{
						flightData.dataType === 'fb' &&
						<Fragment>
							<IconMedal />
							<span style={{ marginRight: 10, marginLeft: 5 }}>Kiểm định bởi chove.vn</span>
						</Fragment>
					}

					<CheckLogin onClick={this.handleSell}>
						<Button type="primary" loading={this.state.btnLoading}>Liên hệ</Button>
					</CheckLogin>
				</div>
			);
		} else if (type === 'selling') {
			if (flightData.isBid) {
				return (
					<Fragment>
						<div className={classes.actionWrapper}>
							<span>Mức giá của bạn</span>
							<Input
								addonAfter={<span>VND</span>}
								className={classes.input}
							/>
							<Button type="primary" loading={this.state.btnLoading}>Đấu giá</Button>
						</div>
					</Fragment>
				);
			}
			return (
				<div className={classes.examine}>
					{
						flightData.dataType === 'fb' &&
						<Fragment>
							<IconMedal />
							<span style={{ marginRight: 10, marginLeft: 5 }}>Kiểm định bởi chove.vn</span>
						</Fragment>
					}
					<CheckLogin onClick={this.handleBuy}>
						<Button type="primary" loading={this.state.btnLoading}>Mua</Button>
					</CheckLogin>
				</div>
			);
		}

		return null;
	}

	render() {
		const { classes, flightData = {}, action } = this.props;

		const { creator = {} } = flightData;

		return (
			<div className={classes.root}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={this.state.loading ? f => f : () => action.toggleFlightModal({ open: false })} />
				<div className={classes.header}>
					<Avatar size={40} style={{ marginRight: 5 }} src={creator.avatar} name={creator.fullName} onClick={this.handleClickAvatar} />
					<span className={classes.author} onClick={this.handleClickAvatar}>{creator.fullName}</span>
					<span className={classes.note}>{moment(flightData.updatedAt).format('DD/MM/YYYY hh:mm')}</span>
				</div>

				<div className={classes.body}>
					<div className={classes.title}>Nội dung</div>
					<div className="pre-wrap">{flightData.content}</div>
					{
						flightData.dataType === 'fb' &&
						<span className={`${classes.link} ${!AuthStorage.loggedIn && classes.blur}`}>
							<Icon type="link" style={{ marginRight: 5 }} />
							<CheckLogin style={{ display: 'inline-block' }}>
								<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">https://facebook.com</a>
							</CheckLogin>
						</span>
					}

					<div style={{ marginTop: 50, paddingRight: 80 }}>
						<TripBlock tripData={flightData.trip} />
						{
							flightData.tripBack &&
							<div className={classes.divider} />
						}
						<TripBlock tripData={flightData.tripBack} />
					</div>

					<Row type="flex" style={{ marginBottom: '30px' }}>
						<Col span={8} style={{ display: 'flex' }}>
							{
								getLabel(flightData.airline, flightOptions).value === 'all' ? (
									<Fragment>
										<IconDeparture size={18} extended />
										<span className={classes.note} style={{ marginLeft: 10 }}>Tất cả các hãng</span>
									</Fragment>
								) : (
									<img src={getLabel(flightData.airline, flightOptions).logo} alt="" height={18} />
								)
							}
						</Col>
						<Col span={8} className="text-right">
							<Tag color="#95A2AB">{flightData.seatType}</Tag>
							<Tag style={{ marginRight: 0, color: '#95A2AB' }} color="#EAEAEA">{flightData.packageWeight}Kg</Tag>
						</Col>
					</Row>
				</div>

				<div className={classes.footer}>
					{this._renderFooter()}
				</div>
			</div>
		);
	}
}
