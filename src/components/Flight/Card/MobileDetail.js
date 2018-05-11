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
import { injectIntl, intlShape } from 'react-intl';

import { Icon, Button, InputNumber, notification, Row, Col, Tag, Tooltip, Divider } from 'antd';

import { flightOptions } from 'src/constants/selectOption';
import { getLabel, formatNumber } from 'src/utils';

import withStyles from 'src/theme/jss/withStyles';
import Avatar from 'src/components/Photo/Avatar';
import IconMedal from 'src/components/Photo/IconMedal';
import IconDeparture from 'src/components/Photo/IconDeparture';

import { toggleFlightModal, toggleLoginModal } from 'src/redux/actions/modal';
import { updateTicketBuying } from 'src/redux/actions/ticket-buying';
import { updateTicketSelling, createTicketSellingBid } from 'src/redux/actions/ticket-selling';

import AuthStorage from 'src/utils/AuthStorage';

import CheckLogin from 'src/components/Form/CheckLogin';
import ImageLightBox from 'src/components/Photo/LightBox';

import BidBlock from './BidBlock';
import TripBlock from './TripBlock';
import GroupStar from './GroupStar';

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
		marginRight: 10,
	},

	footer: {
		padding: 20,
		marginTop: 20,

		'@media (max-width: 991.98px)': {
			paddingTop: 0,
		},
	},

	remainingTimeInfo: {
		fontWeight: 600,
		fontSize: 16,
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
		'& a': {
			display: 'inline-block',
			width: '250px',
			whiteSpace: 'nowrap',
			overflow: 'hidden !important',
			textOverflow: 'ellipsis',
		},
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
	bodyItem: {
		marginTop: 10,
	},
	imgWrapper: {
		overflowX: 'auto',
		marginTop: 10,
	},
	img: {
		display: 'flex',
		'& img': {
			height: 100,
			width: 'auto',
			marginRight: 3,
		},
	},
	wrapperTrip: {
		marginTop: 50,
		paddingRight: 80,

		'@media (max-width: 991.98px)': {
			marginTop: 20,
			paddingRight: 20,
		},
	},
	wrapperAirline: {
		marginBottom: 30,

		'@media (max-width: 991.98px)': {
			marginBottom: 10,
		},
	},
	iconMedal: {
		position: 'absolute',
		right: 10,
		top: 20,
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
			createTicketSellingBid,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
@injectIntl
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
			createTicketSellingBid: PropTypes.func,
		}).isRequired,
		onCancel: PropTypes.func.isRequired,
		intl: PropTypes.shape({
			formatMessage: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		flightData: {},
		type: 'selling',
	}

	state = {
		btnLoading: false,
		bidPrice: '',
	}

	handleSell = () => {
		const { formatMessage } = this.props.intl;

		if (this.props.flightData.id) {
			this.setState({
				btnLoading: true,
			});
			this.props.action.updateTicketBuying({
				status: 'closed',
				updatedAt: new Date(),
				id: this.props.flightData.id,
				contactId: AuthStorage.userId,
			}, () => {
				this.setState({
					btnLoading: false,
				});
				notification.success({
					message: formatMessage({ id: 'congrats' }),
					description: formatMessage({ id: 'contact_success' }),
				});
				this.props.onCancel();
			}, () => {
				this.setState({
					btnLoading: false,
				});
				this.props.onCancel();
			});
		}
	}

	handleBuy = () => {
		const { formatMessage } = this.props.intl;

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
					message: formatMessage({ id: 'congrats' }),
					description: formatMessage({ id: 'buy_ticket_success' }),
				});
				this.props.onCancel();
			}, () => {
				this.setState({
					btnLoading: false,
				});
				this.props.onCancel();
			});
		}
	}

	handleBid = () => {
		const { formatMessage } = this.props.intl;

		if (this.props.flightData.id) {
			this.setState({
				btnLoading: true,
			});
			this.props.action.createTicketSellingBid({
				price: this.state.bidPrice,
				status: 'active',
				bidderId: AuthStorage.userId,
				ticketSellingId: this.props.flightData.id,
			}, () => {
				this.setState({
					btnLoading: false,
				});
				notification.success({
					message: formatMessage({ id: 'congrats' }),
					description: formatMessage({ id: 'bid_success' }),
				});
				this.props.onCancel();
			}, () => {
				this.setState({
					btnLoading: false,
				});
				this.props.onCancel();
			});
		}
	}

	_renderFooter() {
		const { classes, type, flightData, intl: { formatMessage } } = this.props;

		if (type === 'buying') {
			return (
				<div className={classes.examine}>


					<CheckLogin onClick={this.handleSell}>
						<Button type="primary" loading={this.state.btnLoading}>{formatMessage({ id: 'contact' })}</Button>
					</CheckLogin>
				</div>
			);
		} else if (type === 'selling') {
			if (flightData.isBid) {
				return (
					<Fragment>
						<Row>
							<Col md={6} xs={10}>
								<BidBlock price={flightData.price} />
							</Col>
							<Col md={6} xs={10}>
								<BidBlock isStart price={flightData.startingPrice} />
							</Col>
							<Col xs={4} />
							<Col md={8} xs={10}>
								<div className="hidden-sm-up">
									<div style={{ marginBottom: 10 }}>
										<div>{formatMessage({ id: 'remaining_time' })}</div>
										<div className={classes.remainingTimeInfo}>{moment(flightData.dueDate).fromNow()}</div>
									</div>
								</div>
								<div className="hidden-sm-down">
									<div style={{ marginRight: 25 }}>
										<div>{formatMessage({ id: 'remaining_time' })}</div>
										<div className={classes.remainingTimeInfo}>{moment(flightData.dueDate).fromNow()}</div>
									</div>
								</div>
							</Col>
						</Row>
						<div className={classes.actionWrapper}>
							<span>{formatMessage({ id: 'your_price' })}</span>
							<InputNumber
								formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								className="price"
								// className={classes.input}
								value={this.state.bidPrice}
								style={{ width: '100%', marginTop: 10, marginBottom: 10 }}
								onChange={(bidPrice) => { this.setState({ bidPrice }); }}
							/>
							<div className="text-right">
								<Button type="primary" loading={this.state.btnLoading} onClick={this.handleBid}>{formatMessage({ id: 'bid' })}</Button>
							</div>
						</div>
					</Fragment>
				);
			}
			return (
				<div className={classes.examine}>

					<CheckLogin onClick={this.handleBuy}>
						<Button type="primary" loading={this.state.btnLoading}>{formatMessage({ id: 'buy' })}</Button>
					</CheckLogin>
				</div>
			);
		}

		return null;
	}

	renderLoading() {
		const { classes, action } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<Avatar size={40} style={{ marginRight: 5 }} loading />
					<span className="loading-block" style={{ width: 200 }} />
				</div>

				<div className={classes.body} style={{ paddingBottom: 30 }}>
					<div className="loading-block" />
					<div className="loading-block" />
					<div className="loading-block" />
					<div className="loading-block" />

					<div style={{ marginTop: 30, paddingRight: 80 }}>
						<TripBlock loading />
					</div>

				</div>

			</div>
		);
	}
	render() {
		const { classes, flightData = {}, action, type, intl: { formatMessage } } = this.props;

		const { creator = {}, fbFeed = {} } = flightData;

		if (flightData.loading) {
			return this.renderLoading();
		}

		return (
			<div className={classes.root}>
				{
					flightData.approved && (
						<span className={classes.iconMedal}>
							<IconMedal color="#2D9CDB" />
						</span>
					)
				}
				<div className={classes.header}>
					{
						flightData.dataType === 'fb' ?
							<a
								href={'https://facebook.com/' + fbFeed.author.id}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<Avatar style={{ marginBottom: 5, marginRight: 10 }} size={40} src={fbFeed.author.picture} name={fbFeed.author.name} />
								<span className={classes.author}>{fbFeed.author.name}</span>
							</a> :
							<div style={{ display: 'flex' }}>
								<Avatar size={40} style={{ marginRight: 5 }} src={creator.avatar} name={creator.fullName} />
								<div>
									<span className={classes.author}>{creator.fullName}</span>
									<span className={classes.note}>{moment(flightData.updatedAt).format('DD/MM/YYYY hh:mm')}</span>
									<GroupStar />
								</div>
							</div>
					}

				</div>

				<div className={classes.body}>
					<div>
						<div className={classes.title}>{formatMessage({ id: 'content' })}:</div>
						<div className="pre-wrap">
							{flightData.content}
						</div>
					</div>
					{
						flightData.dataType === 'fb' &&
						<span className={`${classes.link} ${!AuthStorage.loggedIn && classes.blur}`}>
							<Icon type="link" style={{ marginRight: 5 }} />
							<CheckLogin style={{ display: 'inline-block' }}>
								<a href={'https://facebook.com/' + fbFeed.id} target="_blank" rel="noopener noreferrer">https://facebook.com/{fbFeed.id}</a>
							</CheckLogin>
						</span>
					}

					<div className={classes.bodyItem}>
						<span className={classes.title}>{formatMessage({ id: 'ticket_seat_count' })}:</span>
						<span>{flightData.seatCount || 1}</span>
					</div>
					{
						type === 'selling' &&
						<div className={classes.bodyItem}>
							<span className={classes.title}>{formatMessage({ id: 'ticket_price' })}:</span>
							<span>{formatNumber(flightData.price)} VNĐ</span>
						</div>
					}
					{
						flightData.images && flightData.images.length > 0 &&
						<div className={classes.imgWrapper}>
							<div className={classes.title}>{formatMessage({ id: '' })}:</div>
							<ImageLightBox
								className={classes.img}
								images={flightData.images}
							/>
						</div>
					}

					<Divider className={classes.divider} />

					<div className={classes.wrapperTrip}>
						<TripBlock tripData={flightData.trip} />
						{
							flightData.tripBack &&
							<div className={classes.divider} />
						}
						<TripBlock tripData={flightData.tripBack} />
					</div>

					<Row type="flex" className={classes.wrapperAirline}>
						<Col span={12} style={{ display: 'flex' }}>
							{
								getLabel(flightData.airline, flightOptions).value === 'all' ? (
									<Fragment>
										<IconDeparture size={18} extended />
										<span className={classes.note} style={{ marginLeft: 10 }}>{formatMessage({ id: 'all_airline' })}</span>
									</Fragment>
								) : (
									<img src={getLabel(flightData.airline, flightOptions).logo} alt="" height={18} />
								)
							}
						</Col>
						<Col span={12} className="text-right">
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
