/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-15 15:06:09
*------------------------------------------------------- */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';
import { Button, Input, Select, DatePicker, Tabs, Row, Col } from 'antd';
import FlightCard from 'src/components/Flight/Card';
import FlightModal from 'src/components/Modals/Flight';
import FlightDetail from 'src/components/Flight/Card/Detail';
import SearchBar from 'src/components/Form/SearchBar';
import Container from 'src/components/Layout/Container';

const styleSheet = (theme) => ({
	root: {
		position: 'relative',
		width: 1180,
		margin: 'auto',
		background: '#FFF',
		zIndex: 1,
		paddingBottom: 20,
	},

	banner: {
		position: 'absolute',
		zIndex: -1,
		width: '100%',
		background: 'lightblue url("/static/assets/images/banner.jpeg") no-repeat fixed center',
		height: 384,
		left: 0,
		backgroundSize: 1180,
		backgroundPosition: '50% -139%',

		'&:after': {
			content: '""',
			display: 'block',
			background: 'linear-gradient(#4F3F91, #496BC4)',
			opacity: 0.5,
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: 0,
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
		store: PropTypes.shape({
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleLoginModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.banner} />
				<Container>
					<div className={classes.title}>Tìm kiếm chuyến bay giá rẻ khắp mọi nơi</div>
					<Tabs defaultActiveKey="1" className={classes.tabs}>
						<Tabs.TabPane tab="Vé máy bay" key="1" />
						<Tabs.TabPane tab="Phòng khách sạn" key="2" />
						<Tabs.TabPane tab="Voucher" key="3" />
					</Tabs>
					<SearchBar />
					<Row gutter={20} className={classes.wrapperContent}>
						<div className={classes.border} />
						<Col span={12}>
							<Button type="primary" className={classes.btn}>Tìm mua</Button>
							<FlightCard />
							<FlightCard />
							<FlightCard />
							<FlightCard />
							<FlightCard />
							<FlightCard />
							<FlightCard />
							<FlightCard />
						</Col>
						<Col span={12}>
							<Button type="primary" className={classes.btn}>Đăng bán</Button>
							<FlightCard />
						</Col>
					</Row>
				</Container>

				<FlightModal />
			</div>
		);
	}
}
