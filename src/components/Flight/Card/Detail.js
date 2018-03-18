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

import { Row, Col, Tag, Icon, Button, Input } from 'antd';

import withStyles from 'src/theme/jss/withStyles';
import Avatar from 'src/components/Photo/Avatar';
import Price from 'src/components/Stuff/Price';
import IconDeparture from 'src/components/Photo/IconDeparture';
import IconMedal from 'src/components/Photo/IconMedal';

import { toggleFlightModal } from 'src/redux/actions/modal';

import GroupStar from './GroupStar';
import BidBlock from './BidBlock';
import FlightBlock from './FlightBlock';

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
});

function mapStateToProps(state) {
	return {
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleFlightModal,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
export default class SearchBar extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		type: PropTypes.string.isRequired,
		badge: PropTypes.string,

	}

	static defaultProps = {
		badge: '',
		type: 'bid',
	}

	state = {
	}

	handleClickFlight = () => {
		this.props.action.toggleFlightModal({ open: true });
	}

	_renderAction() {
		const { classes, flight } = this.props.flight;

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
		const { classes, flight } = this.props;
		const { author, updatedTime, content, link, rate, type, isHot } = flight;

		if (type === 'sell') {
			return (
				<Button type="primary">Liên hệ</Button>
			);
		} else if (type === 'buy') {
			return (
				<div className={classes.examine}>
					<IconMedal />
					<span style={{ marginRight: 10, marginLeft: 5 }}>Kiểm định bởi chove.vn</span>
					<Button type="primary">Liên hệ</Button>
				</div>
			);
		} else if (type === 'bid') {
			return (
				<Fragment>
					<div className={classes.actionWrapper}>
						<span>Mức giá của bạn</span>
						<Input
							addonAfter={<span>VND</span>}
							className={classes.input}
						/>
						<Button type="primary">Đấu giá</Button>
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
		const { classes, flight } = this.props;
		const { author, updatedTime, content, link, rate, type, isHot } = flight;

		return (
			<div className={classes.root} onClick={this.handleClickFlight}>
				<div className={classes.header}>
					<Avatar size={40} style={{ marginRight: 5 }} />
					<span className={classes.author}>{author.fullname}</span>
					<span className={classes.note}>{updatedTime}</span>
				</div>

				<div className={classes.body}>
					<div className={classes.title}>Nội dung</div>
					<div>{content}</div>
					<span className={classes.link}>
						<Icon type="link" style={{ marginRight: 5 }} />
						<a href={link}>{link}</a>
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
