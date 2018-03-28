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

import { Row, Col, Icon, Button, notification } from 'antd';

import withStyles from 'src/theme/jss/withStyles';
import Avatar from 'src/components/Photo/Avatar';
import Price from 'src/components/Stuff/Price';

import { toggleFlightModal } from 'src/redux/actions/modal';
import { updateFlight } from 'src/redux/actions/flight';
import AuthStorage from 'src/utils/AuthStorage';
import CheckLogin from 'src/components/Form/CheckLogin';

import GroupStar from './GroupStar';
import BidBlock from './BidBlock';
import FlightBlock from './FlightBlock';

const styleSheet = (theme) => ({
	root: {
		textAlign: 'left',
		padding: '0 15px',
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
	header: {
		borderBottom: `1px solid ${theme.palette.text.divider}`,
		padding: 15,
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
		padding: 15,
	},
	bodyRight: {
		textAlign: 'right',
		borderLeft: `1px solid ${theme.palette.text.divider}`,

		'& > p': {
			fontWeight: 600,
			fontSize: 16,
			marginBottom: 16,
		},
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 15,
		textAlign: 'right',
	},
	footerTitle: {
		color: '#596A75',
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
		maxWidth: 350,
		overflow: 'hidden',
		textOverflow: 'ellipsic',

		'& > i': {
			marginRight: 5,
		},
	},
	content: {
		display: '-webkit-box',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
		overflow: 'hidden',
		marginBottom: 5,
	},
});

function mapStateToProps(/* state */) {
	return {
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleFlightModal,
			updateFlight,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
export default class FlightCard extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		flight: PropTypes.object,
		action: PropTypes.shape({
			toggleFlightModal: PropTypes.func,
			updateFlight: PropTypes.func,
		}).isRequired,
		loading: PropTypes.bool,
	}

	static defaultProps = {
		flight: {
			buyer: {
				fullName: 'Trịnh Thu Hương',
			},
			updatedAt: '12/02/2018 16:08',
			content: 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018',
			link: 'https://dulichgiare.com.vn/vemaybay/147dqe',
			departure: 'Nha Trang',
			destination: 'Hải Phòng',
			agency: null,
			type: 'buy',
			dueDate: '12/02/2018 16:08',
			startDate: '12/02/2018',
			startPrice: 1200000,
			currentPrice: 1300000,
			bidderId: 1,
			rate: 3,
			stock: 1,


		},
		loading: false,
	}

	state = {
	}

	handleClickFlight = () => {
		this.props.action.toggleFlightModal({ open: true, data: this.props.flight });
	}

	handleSell = () => {
		this.setState({
			btnLoading: true,
		});
		this.props.action.updateFlight({
			status: 'Payment pending',
			updatedAt: new Date(),
			id: this.props.flight.id,
			sellerId: AuthStorage.userId,
		}, () => {
			this.setState({
				btnLoading: false,
			});
			notification.success({
				message: 'Chúc mừng!',
				description: 'Bạn đã mua vé thành công! Vui lòng kiểm tra hộp thư.',
			});
		}, () => {
			this.setState({
				btnLoading: false,
			});
		});
	}

	handleBuy = () => {
		this.setState({
			btnLoading: true,
		});
		this.props.action.updateFlight({
			status: 'Payment pending',
			updatedAt: new Date(),
			id: this.props.flight.id,
			buyerId: AuthStorage.userId,
		}, () => {
			this.setState({
				btnLoading: false,
			});
			notification.success({
				message: 'Chúc mừng!',
				description: 'Bạn đã đặt vé thành công! Vui lòng kiểm tra hộp thư.',
			});
		}, () => {
			this.setState({
				btnLoading: false,
			});
		});
	}

	_renderBodyRight = () => {
		const { type, stock, price } = this.props.flight;

		if (type === 'Sell') {
			return (
				<Fragment>
					<p>{stock} vé</p>
					<CheckLogin onClick={this.handleSell}>
						<Button type="primary" loading={this.state.btnLoading}>Liên hệ</Button>
					</CheckLogin>
				</Fragment>
			);
		} else if (type === 'Buy') {
			return (
				<Fragment>
					<p><Price price={price} type="primary" /></p>
					<CheckLogin onClick={this.handleBuy} >
						<Button type="primary" loading={this.state.btnLoading}>Mua</Button>
					</CheckLogin>
				</Fragment>
			);
		} else if (type === 'Bid') {
			return (
				<Fragment>
					<BidBlock isStart price={1200000} />
					<BidBlock price={1300000} />
				</Fragment>
			);
		}

		return null;
	}

	render() {
		const { classes, flight, loading } = this.props;
		const { updatedAt, content, link, rate, type, isHot, seller, buyer } = flight;

		if (loading) {
			return (
				<div className={classes.root} onClick={this.handleClickFlight}>
					<Row type="flex" className={classes.header}>
						<Col span={18}>
							<div className="loading-block" />
							<div className="loading-block" />
							<div className="loading-block" />
						</Col>
						<Col offset={1} span={5} style={{ textAlign: 'center' }}>
							<Avatar style={{ marginBottom: 5 }} size={40} loading />
						</Col>
					</Row>

					<Row className={classes.body}>
						<Col span={16}>
							<FlightBlock flight={flight} loading />
						</Col>
						<Col span={7} offset={1} className={classes.bodyRight}>
							<div className="loading-block" />
							<Button type="primary" loading />
						</Col>
					</Row>
				</div>
			);
		}
		return (
			<div className={classes.root} onClick={this.handleClickFlight}>
				<Row type="flex" className={classes.header}>
					<Col span={18}>
						<span className={classes.author}>
							{ type === 'Sell' ? seller.fullName : buyer.fullName}
						</span>
						<span className={classes.note}>{updatedAt}</span>
						<div className={classes.content}>{content}</div>
						<span className={classes.link}>
							<Icon type="link" />
							<a href={link}>Link</a>
						</span>
					</Col>
					<Col offset={1} span={5} style={{ textAlign: 'center' }}>
						<Avatar style={{ marginBottom: 5 }} size={40} src={type === 'Sell' ? seller.avatar : buyer.avatar} />
						<GroupStar rate={rate} />
					</Col>
				</Row>

				<Row className={classes.body}>
					<Col span={16}>
						<FlightBlock flight={flight} />
					</Col>
					<Col span={7} offset={1} className={classes.bodyRight}>
						{this._renderBodyRight()}
					</Col>
				</Row>

				{
					type === 'bid' && (
						<div className={classes.footer}>
							<div style={{ marginRight: 25 }}>
								<div className={classes.footerTitle}>Giá khởi điểm</div>
								<div className={classes.footerInfo}>8 giờ 30 phút</div>
							</div>
							<Button type="primary">Đấu giá</Button>
						</div>
					)
				}

				{
					!!isHot && (
						<div className={classes.badge}>
							<span>HOT</span>
						</div>
					)
				}
			</div>
		);
	}
}
