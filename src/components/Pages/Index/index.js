/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-15 15:06:09
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
// import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';
import FlightList from 'src/components/Flight/List';
import MobileFlightList from 'src/components/Flight/List/MobileList';
import FlightModal from 'src/components/Modals/Flight';
import Container from 'src/components/Layout/Container';

const styleSheet = (theme) => ({
	root: {
		position: 'relative',
		margin: 'auto',
		background: '#FFF',
		zIndex: 1,
		paddingBottom: 20,

		'@media (max-width: 991.98px)': {
			background: 'none',
		},
	},

	banner: {
		left: '0',
		width: '100%',
		height: '384px',
		zIndex: '-1',
		position: 'absolute',
		background: 'lightblue url(/static/assets/images/banner.jpeg)',
		backgroundSize: 'cover',
		backgroundPosition: '55%',
		'&:after': {
			top: '0',
			width: '100%',
			height: '100%',
			content: '""',
			display: 'block',
			opacity: '0.5',
			position: 'absolute',
			background: 'linear-gradient(221.52deg, #4F3F91 28.2%, #496BC4 81.27%)',
			boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
		},
	},

	title: {
		paddingTop: 80,
		paddingBottom: 30,
		textAlign: 'center',
		fontStyle: 'italic',
		fontSize: 22,
		fontWeight: 500,
		color: '#FFF',
		fontFamily: 'Lato',
	},

	tabs: {
		'& > .ant-tabs-bar': {
			borderBottom: 0,
			display: 'flex',
			justifyContent: 'center',
			color: 'rgba(255, 255, 255, 0.8)',

			'& .ant-tabs-tab:hover, & .ant-tabs-tab-active': {
				color: '#FFF',
			},
		},

		'& .ant-tabs-ink-bar': {
			backgroundColor: theme.palette.secondary[500],
		},
	},

	wrapperContent: {
		position: 'relative',
		textAlign: 'center',
	},

	btn: {
		marginBottom: 10,
	},

	border: {
		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			width: 'calc(100% - 20px)',
			height: 1,
			borderTop: '1px dotted #FFF',
			top: 17,
		},

		'&:after': {
			content: '""',
			display: 'block',
			position: 'absolute',
			width: 1,
			height: 120,
			borderLeft: '1px dotted #FFF',
			top: 17,
			left: '50%',
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			// modal: state.get('modal').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		// action: bindActionCreators({
		// toggleLoginModal,
		// }, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
export default class ClassName extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		// store: PropTypes.shape({
		// 	modal: PropTypes.object.isRequired,
		// }).isRequired,
		// // action
		// action: PropTypes.shape({
		// 	toggleLoginModal: PropTypes.func.isRequired,
		// }).isRequired,
	}

	static defaultProps = {}

	render() {
		const { classes } = this.props;
		let isDesktop = true;
		if (typeof window !== 'undefined') {
			isDesktop = window.innerWidth >= 992;
		}

		if (!isDesktop) {
			return (
				<div className={classes.root}>
					<div className={classes.banner + ' hidden-md-down'} />
					<Container>
						<MobileFlightList />
					</Container>

					<FlightModal />
				</div>
			);
		}

		return (
			<div className={classes.root}>
				<div className={classes.banner + ' hidden-md-down'} />
				<Container>
					<div className={classes.title}>Sang nhượng vé rẻ khắp mọi nơi</div>
					<div style={{ height: 60 }} />
					<Tabs defaultActiveKey="1" className={classes.tabs}>
						<Tabs.TabPane tab="Vé máy bay" key="1" />
						<Tabs.TabPane tab="Phòng khách sạn" key="2" />
						<Tabs.TabPane tab="Voucher" key="3" />
					</Tabs>
					{isDesktop ? <FlightList /> : <MobileFlightList />}
				</Container>

				<FlightModal />
			</div>
		);


	}
}
