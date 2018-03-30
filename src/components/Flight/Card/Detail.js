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

import { Icon, Button, Input, notification } from 'antd';

import withStyles from 'src/theme/jss/withStyles';
import Avatar from 'src/components/Photo/Avatar';
import IconMedal from 'src/components/Photo/IconMedal';

import { toggleFlightModal, toggleLoginModal } from 'src/redux/actions/modal';
import { updateFlight } from 'src/redux/actions/flight';

import AuthStorage from 'src/utils/AuthStorage';

import FlightBlock from './FlightBlock';
import CheckLogin from 'src/components/Form/CheckLogin';

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
	header: {
		padding: 15,
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
		padding: 15,
	},
	title: {
		fontWeight: 600,
		textTransform: 'uppercase',
	},

	footer: {
		textAlign: 'right',
		padding: 15,
		borderTop: '1px solid #ccc',
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
		borderTop: '1px solid #ccc',
		margin: '1em 0',
		padding: 0,
	},

	link: {
		marginBottom: 30,
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
		store: {
			flightModal: state.getIn(['modal', 'flight']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleFlightModal,
			toggleLoginModal,
			updateFlight,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
export default class SearchBar extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		store: PropTypes.shape({
			flightModal: PropTypes.object,
		}).isRequired,
		action: PropTypes.shape({
			updateFlight: PropTypes.func,
			toggleFlightModal: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
	}

	state = {
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
				description: 'Bạn đã đặt vé thành công! Vui lòng kiểm tra hộp thư.',
			});
			this.props.action.toggleFlightModal({ open: false });
		}, () => {
			this.setState({
				btnLoading: false,
			});
			this.props.action.toggleFlightModal({ open: false });
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

	handleClickAvatar = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const { type, seller, buyer, from } = this.props.store.flightModal.data;

		if (from) {
			window.open(`https://fb.com/${from.id}`);
		}
	}

	_getAuthor = (flight) => {
		const { type, seller, buyer, from } = flight;

		if (from && from.id) {
			return {
				id: from.id,
				fullName: from.name,
				avatar: from.picture ? from.picture.data.url : '',
			};
		}

		return (type === 'Buy') ? buyer : seller;
	}

	_renderAction() {
		const { classes } = this.props;

		return (
			<div className={classes.actionWrapper}>
				<span>Mức giá của bạn</span>
				<Input
					addonAfter={<span>VND</span>}
					className={classes.input}
				/>
				<Button type="primary">Đấu giá</Button>
			</div>
		);
	}

	_renderFooter() {
		const { classes } = this.props;
		const flight = this.props.store.flightModal.data;
		const { type } = flight;

		if (type === 'Buy') {
			return (
				<CheckLogin onClick={this.handleSell}>
					<Button type="primary" loading={this.state.btnLoading}>Liên hệ</Button>
				</CheckLogin>
			);
		} else if (type === 'Sell') {
			return (
				<div className={classes.examine}>
					<IconMedal />
					<span style={{ marginRight: 10, marginLeft: 5 }}>Kiểm định bởi chove.vn</span>
					<CheckLogin onClick={this.handleBuy}>
						<Button type="primary" loading={this.state.btnLoading}>Mua</Button>
					</CheckLogin>
				</div>
			);
		} else if (type === 'Bid') {
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
					<div className={classes.examine} style={{ marginTop: 15 }}>
						<IconMedal />
						<span style={{ marginLeft: 5 }}>Kiểm định bởi chove.vn</span>
					</div>
				</Fragment>
			);
		}

		return null;
	}

	render() {
		const { classes } = this.props;
		const flight = this.props.store.flightModal.data;
		const { updatedTime, content, link } = flight;
		const author = this._getAuthor(flight);

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<Avatar size={40} style={{ marginRight: 5 }} src={author.avatar} onClick={this.handleClickAvatar} />
					<span className={classes.author} onClick={this.handleClickAvatar}>{author.fullName}</span>
					<span className={classes.note}>{updatedTime}</span>
				</div>

				<div className={classes.body}>
					<div className={classes.title}>Nội dung</div>
					<div>{content}</div>
					<span className={`${classes.link} ${!AuthStorage.loggedIn && classes.blur}`}>
						<Icon type="link" style={{ marginRight: 5 }} />
						<CheckLogin style={{ display: 'inline-block' }}>
							<a href={AuthStorage.loggedIn && link}>{link}</a>
						</CheckLogin>
					</span>
					<FlightBlock flight={flight} style={{ maxWidth: '66.67%' }} />
					<div className={classes.divider} />
					<FlightBlock flight={flight} style={{ maxWidth: '66.67%' }} />
				</div>

				<div className={classes.footer}>
					{this._renderFooter()}
				</div>
			</div>
		);
	}
}
