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
import Router from 'next/router';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col, Icon, Button, Modal, Tooltip, Tag } from 'antd';

import withStyles from 'src/theme/jss/withStyles';
import Avatar from 'src/components/Photo/Avatar';
import Price from 'src/components/Stuff/Price';

import { toggleFlightModal, toggleUserInfoModal, toggleEditBuyingModal, toggleEditSellingModal } from 'src/redux/actions/modal';
import { deleteTicketBuying } from 'src/redux/actions/ticket-buying';
import { deleteTicketSelling } from 'src/redux/actions/ticket-selling';
import IconMedal from 'src/components/Photo/IconMedal';
import AuthStorage from 'src/utils/AuthStorage';

import CheckLogin from 'src/components/Form/CheckLogin';
import { flightOptions } from 'src/constants/selectOption';
import { getLabel } from 'src/utils';

import IconDeparture from 'src/components/Photo/IconDeparture';
import GroupStar from './GroupStar';
import BidBlock from './BidBlock';
import TripBlock from './TripBlock';


moment.locale('vi');

const styleSheet = (theme) => ({
	root: {
		textAlign: 'left',
		padding: 15,
		background: '#FFF',
		borderRadius: 8,
		boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15)',
		marginBottom: 8,
		position: 'relative',
		transition: 'all .5s',

		'&:hover': {
			boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.35)',
		},
	},
	badgePending: {
		top: '0',
		left: '0',
		width: '0',
		height: '0',
		position: 'absolute',
		borderTop: '30px solid #faad14',
		borderRight: '30px solid transparent',
		borderLeft: '30px solid #faad14',
		borderRadius: '8px 0 0 0',
		borderBottom: '30px solid transparent',

		'& > span': {
			top: '-25px',
			left: '-24px',
			color: '#FFF',
			position: 'absolute',
			fontSize: '9px',
			transform: 'rotate(-45deg)',
			fontWeight: '600',
			textTransform: 'uppercase',
		},
	},
	badgeClose: {
		top: '0',
		left: '0',
		width: '0',
		height: '0',
		position: 'absolute',
		borderTop: '30px solid red',
		borderRight: '30px solid transparent',
		borderLeft: '30px solid red',
		borderRadius: '8px 0 0 0',
		borderBottom: '30px solid transparent',

		'& > span': {
			top: '-20px',
			left: '-29px',
			color: '#FFF',
			position: 'absolute',
			fontSize: '9px',
			transform: 'rotate(-45deg)',
			fontWeight: '600',
			width: '50px',
			textTransform: 'uppercase',
		},
	},
	header: {
		borderBottom: `1px solid ${theme.palette.text.divider}`,
		paddingBottom: 5,
		// padding: 15,
		// display: 'flex',
	},
	wrapperUserInfo: {
		display: 'flex',
	},
	author: {
		textTransform: 'uppercase',
		color: theme.palette.text.secondary,
		fontWeight: 600,
		marginRight: 10,
		cursor: 'pointer',
	},
	note: {
		color: theme.palette.text.disabled,
		fontWeight: 500,
		fontSize: 12,
	},
	body: {
		paddingTop: 15,
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 5,
	},
	footerText: {
		fontWeight: '500',
		fontSize: '16px',
		textTransform: 'uppercase',
	},
	footerAction: {
		display: 'flex',
		alignItems: 'baseline',
	},
	footerActionBtn: {
		display: 'flex',
		alignItems: 'baseline',
		marginLeft: 15,
	},
	// footer: {
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	justifyContent: 'flex-end',
	// 	paddingBottom: 15,
	// 	textAlign: 'right',
	// },
	footerTitle: {
		color: '#596A75',
		fontSize: 12,
	},
	footerInfo: {
		fontWeight: 600,
	},
	badge: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 0,
		height: 0,
		borderRadius: '0 8px 0 8px',
		borderBottom: '22px solid transparent',
		borderLeft: '22px solid transparent',
		borderTop: `22px solid ${theme.palette.secondary[900]}`,
		borderRight: `22px solid ${theme.palette.secondary[900]}`,

		'& > span': {
			position: 'absolute',
			top: -13,
			left: -4,
			fontSize: 11,
			fontWeight: 600,
			color: '#FFF',
			transform: 'rotate(45deg)',
			textTransform: 'uppercase',
		},
	},
	link: {
		color: theme.palette.primary[500],
		overflow: 'hidden',
		maxWidth: '350px',
		textOverflow: 'ellipsis',
		display: 'flex',
		alignItems: 'center',
		'& a': {
			display: 'inline-block',
			width: '250px',
			whiteSpace: 'nowrap',
			overflow: 'hidden !important',
			textOverflow: 'ellipsis',
		},

		'& > i': {
			marginRight: 5,
		},
	},
	blur: {
		'& a': {
			WebkitUserSelect: 'none',
			MozUserSelect: 'none',
			MsUserSelect: 'none',
			userSelect: 'none',
			color: 'transparent',
			cursor: 'pointer',
			position: 'relative',
			textShadow: '0 0 12px #4368C4',
			display: 'block',
		},
	},
	content: {
		display: '-webkit-box',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
		overflow: 'hidden',
		marginBottom: 5,
	},
	iconMedal: {
		position: 'absolute',
		right: 15,
		top: 15,
	},
	bidGroup: {
		textAlign: 'right',

		'& p': {
			marginBottom: 5,
		},
	},
});

function mapStateToProps(/* state */) {
	return {
		// store: {
		// 	auth: state.getIn('auth'),
		// },
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleFlightModal,
			toggleUserInfoModal,
			toggleEditBuyingModal,
			toggleEditSellingModal,
			deleteTicketBuying,
			deleteTicketSelling,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
@injectIntl
export default class FlightCard extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		flightData: PropTypes.object,
		type: PropTypes.string,
		loading: PropTypes.bool,
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			toggleFlightModal: PropTypes.func,
			toggleUserInfoModal: PropTypes.func,
			toggleEditBuyingModal: PropTypes.func,
			toggleEditSellingModal: PropTypes.func,
			deleteTicketBuying: PropTypes.func,
			deleteTicketSelling: PropTypes.func,
		}).isRequired,
		intl: PropTypes.shape({
			formatMessage: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		flightData: {},
		loading: false,
		type: 'buying',
	}

	state = {
	}

	handleClickFlight = () => {
		Router.push(`/ticket-${this.props.type}/${this.props.flightData.id}`);
		// this.props.action.toggleFlightModal({ open: true, type: this.props.type, id: this.props.flightData.id });
	}

	handleClickAvatar = () => {
		const { creator = {} } = this.props.flightData;

		this.props.action.toggleUserInfoModal({ open: true, id: creator.id });
	}

	handleEditBuying = () => {
		this.props.action.toggleEditBuyingModal({ open: true, id: this.props.flightData.id });
	}

	handleEditSelling = () => {
		this.props.action.toggleEditSellingModal({ open: true, id: this.props.flightData.id });
	}

	handleDeleteBuying = () => {
		Modal.confirm({
			title: 'Bạn có chắc muốn xóa vé này không?',
			onOk: () => {
				this.props.action.deleteTicketBuying({ id: this.props.flightData.id });
			},
		});
	}

	handleDeleteSelling = () => {
		Modal.confirm({
			title: 'Bạn có chắc muốn xóa vé này không?',
			onOk: () => {
				this.props.action.deleteTicketSelling({ id: this.props.flightData.id });
			},
		});
	}

	_renderFooter = () => {
		const { type, flightData, classes, intl: { formatMessage } } = this.props;
		const airlineComp = (
			getLabel(flightData.airline, flightOptions).value === 'all' ? (
				<Fragment>
					<IconDeparture size={18} extended />
					<span className={classes.note} style={{ marginLeft: 10 }}>{formatMessage({ id: 'all_airline' })}</span>
				</Fragment>
			) : (
				<img src={getLabel(flightData.airline, flightOptions).logo} alt="" height={18} />
			)
		);

		if (AuthStorage.userId && AuthStorage.userId === flightData.creatorId) {
			if (type === 'buying') {
				return (
					<div className={classes.footer}>
						<div className={classes.footerText}>{flightData.seatCount} {formatMessage({ id: 'ticket' })}</div>
						<div style={{ display: 'flex' }}>
							<CheckLogin onClick={this.handleEditBuying} style={{ marginRight: 10 }}>
								<Button>{formatMessage({ id: 'edit' })}</Button>
							</CheckLogin>
							<CheckLogin onClick={this.handleDeleteBuying}>
								<Button>{formatMessage({ id: 'delete' })}</Button>
							</CheckLogin>
						</div>
					</div>
				);
			}

			return (
				<div className={classes.footer}>
					<Price price={flightData.price} type="primary" />
					<div style={{ display: 'flex' }}>
						<CheckLogin onClick={this.handleEditSelling} style={{ marginRight: 10 }}>
							<Button>{formatMessage({ id: 'edit' })}</Button>
						</CheckLogin>
						<CheckLogin onClick={this.handleDeleteSelling}>
							<Button>{formatMessage({ id: 'delete' })}</Button>
						</CheckLogin>
					</div>
				</div>
			);
		}

		if (type === 'buying') {
			return (
				<Fragment>
					{airlineComp}
					<div className={classes.footer}>
						<div>
							<Tag color="#95A2AB">{flightData.seatType}</Tag>
							<Tag style={{ marginRight: 0, color: '#95A2AB' }} color="#EAEAEA">{flightData.packageWeight}Kg</Tag>
						</div>
						<div className={classes.footerAction}>
							<span className={classes.footerText}>{flightData.seatCount} {formatMessage({ id: 'ticket' })}</span>
							<CheckLogin onClick={this.handleClickFlight}>
								<Button type="primary" className={classes.footerActionBtn}>{formatMessage({ id: 'contact' })}</Button>
							</CheckLogin>
						</div>
					</div>
				</Fragment>
			);
		} else if (type === 'selling') {
			if (flightData.isBid) {
				return (
					<Row>
						<Col span={12}>
							{airlineComp}
							<div style={{ marginTop: 5 }}>
								<Tag color="#95A2AB">{flightData.seatType}</Tag>
								<Tag style={{ marginRight: 0, color: '#95A2AB' }} color="#EAEAEA">{flightData.packageWeight}Kg</Tag>
							</div>
						</Col>
						<Col span={12} className={classes.bidGroup}>
							<BidBlock isStart price={flightData.startingPrice} />
							<BidBlock price={flightData.price} />
						</Col>
						<Col span={24}>
							<div className={classes.footer}>
								<div>
									<div className={classes.footerTitle}>{formatMessage({ id: 'remaining_time' })}</div>
									<div className={classes.footerInfo}>{moment(flightData.dueDate).fromNow()}</div>
								</div>
								<CheckLogin onClick={this.handleClickFlight}>
									<Button type="primary">{formatMessage({ id: 'bid' })}</Button>
								</CheckLogin>
							</div>
						</Col>
					</Row>
				);
			}

			return (
				<Fragment>
					{airlineComp}
					<div className={classes.footer}>
						<div>
							<Tag color="#95A2AB">{flightData.seatType}</Tag>
							<Tag style={{ marginRight: 0, color: '#95A2AB' }} color="#EAEAEA">{flightData.packageWeight}Kg</Tag>
						</div>
						<div className={classes.footerAction}>
							<span><Price price={flightData.price} type="primary" /></span>
							<CheckLogin onClick={this.handleClickFlight}>
								<Button type="primary" className={classes.footerActionBtn}>{formatMessage({ id: 'buy' })}</Button>
							</CheckLogin>
						</div>
					</div>
				</Fragment>
			);
		}

		return null;
	}

	render() {
		const { classes, flightData = {}, loading, intl: { formatMessage } } = this.props;
		const { creator = {}, fbFeed = {} } = flightData;

		const { author = { picture: { data: {} } } } = fbFeed;

		if (loading) {
			return (
				<div className={classes.root}>
					<Row type="flex" className={classes.header}>
						<Col span={18}>
							<div className="loading-block" style={{ width: '60%', height: 20, marginRight: 0 }} />
							<div className="loading-block" />
							<div className="loading-block" />
							<div className="loading-block" />
						</Col>
						<Col offset={1} span={5} style={{ textAlign: 'center' }}>
							<div className="loading-block" style={{ width: 40, height: 40, borderRadius: '50%' }} />
							<div className="loading-block" />
						</Col>
					</Row>

					<Row className={classes.body}>
						<Col span={16}>
							<TripBlock loading />
						</Col>
						<Col span={7} offset={1} className={classes.bodyRight}>
							<div className="loading-block" style={{ height: 20, marginBottom: 10, marginRight: 0 }} />
							<Button type="primary" loading />
						</Col>
					</Row>
				</div>
			);
		}

		return (
			<div className={classes.root}>
				{
					flightData.status === 'pending' &&
					<div className={classes.badgePending}>
						<span>{formatMessage({ id: 'in_progress' })}</span>
					</div>
				}

				{
					flightData.status === 'closed' &&
					<div className={classes.badgeClose}>
						<span>{formatMessage({ id: 'delivered' })}</span>
					</div>
				}

				{
					flightData.approved && (
						<span className={classes.iconMedal}>
							<IconMedal color="#2D9CDB" />
						</span>
					)
				}

				<div className={classes.header}>
					<div className={classes.wrapperUserInfo}>
						<div style={{ marginRight: 10 }}>
							{
								flightData.dataType === 'fb' ? // eslint-disable-line
									AuthStorage.loggedIn ?
										<a href={'https://facebook.com/' + author.id} target="_blank" rel="noopener noreferrer">
											<Avatar style={{ marginBottom: 5 }} size={40} src={author.picture} name={author.name} />
										</a> :
										<CheckLogin>
											<Avatar style={{ marginBottom: 5 }} size={40} src={author.picture} name={author.name} />
										</CheckLogin> :
									<CheckLogin onClick={this.handleClickAvatar}>
										<Avatar style={{ marginBottom: 5, cursor: 'pointer' }} size={40} src={creator.avatar} name={creator.fullName} />
									</CheckLogin>
							}


						</div>
						<div>
							{
								flightData.dataType === 'fb' ? // eslint-disable-line
									AuthStorage.loggedIn ?
										<a className={classes.author} href={'https://facebook.com/' + author.id} target="_blank" rel="noopener noreferrer">
											{author.name}
										</a> :
										<CheckLogin style={{ display: 'inline' }}>
											<a className={classes.author}>
												{author.name}
											</a>
										</CheckLogin> :
									<CheckLogin onClick={this.handleClickAvatar} style={{ display: 'inline' }}>
										<span className={classes.author}>
											{creator.fullName}
										</span>
									</CheckLogin>
							}
							<span className={classes.note}>{moment(flightData.updatedAt).format('DD/MM/YYYY hh:mm')}</span>
							{
								flightData.dataType !== 'fb' && <GroupStar ratingsStats={creator.ratingsStats} ratingsCount={creator.ratingsCount} user={creator} />
							}
						</div>
					</div>
					<div className={classes.content}>{flightData.content}</div>
					{
						flightData.dataType === 'fb' &&
						<span className={`${classes.link} ${!AuthStorage.loggedIn && classes.blur}`}>
							<Icon type="link" />
							<CheckLogin style={{ display: 'inline-block' }}>
								<a href={'https://facebook.com/' + fbFeed.id} target="_blank" rel="noopener noreferrer">https://facebook.com/{fbFeed.id}</a>
							</CheckLogin>
						</span>
					}
				</div>


				<div className={classes.body}>
					<TripBlock tripData={flightData.trip} />
				</div>

				{this._renderFooter()}

				{
					// flightData.isBid && (
					// 	<div className={classes.footer}>
					// 		<div style={{ marginRight: 25 }}>
					// 			<div className={classes.footerTitle}>Thời gian còn lại</div>
					// 			<div className={classes.footerInfo}>{moment(flightData.dueDate).fromNow()}</div>
					// 		</div>
					// 		<CheckLogin onClick={this.handleClickFlight}>
					// 			<Button type="primary">Đấu giá</Button>
					// 		</CheckLogin>
					// 	</div>
					// )
				}

				{
					flightData.isBid && (
						<div className={classes.badge}>
							<span>HOT</span>
						</div>
					)
				}
			</div>
		);
	}
}
