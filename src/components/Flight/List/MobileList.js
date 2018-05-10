/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-01 11:58:01
*------------------------------------------------------- */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Row, Tabs, Menu, Dropdown } from 'antd';

import withStyles from 'src/theme/jss/withStyles';
import MobileSearchBar from 'src/components/Form/SearchBar/MobileSearchBar';

import { getTicketSellingList } from 'src/redux/actions/ticket-selling';
import { getTicketBuyingList } from 'src/redux/actions/ticket-buying';
import { toggleTicketPosterModal } from 'src/redux/actions/modal';
// import moment from 'moment-hijri';
import MobileFlightCard from '../Card/MobileCard';
import AuthStorage from '../../../utils/AuthStorage';

const styleSheet = (/* theme */) => ({
	root: {
		marginBottom: 25,

		'& .ant-tabs-tabpane': {
			padding: 10,
		},
		'& .ant-tabs-bar': {
			position: 'fixed',
			bottom: 0,
			width: '100%',
			background: '#FFF',
			borderTop: 0,
			boxShadow: '0px -2px 3px 0px #e8e8e8',
		},
		'& .ant-tabs-nav': {
			width: '100%',
		},
		'& .ant-tabs-tab': {
			width: '50%',
			margin: 0,
			textAlign: 'center',
			padding: 15,
			fontSize: 15,
		},
	},
	createBtn: {
		position: 'fixed',
		bottom: 70,
		right: 10,
	}
});

const mapStateToProps = (state) => {
	return {
		store: {
			ticketSellingList: state.get('ticketSelling').toJS().list,
			ticketBuyingList: state.getIn(['ticketBuying', 'list']),
		},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getTicketSellingList,
			getTicketBuyingList,
			toggleTicketPosterModal,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
export default class MobileList extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			ticketSellingList: PropTypes.object.isRequired,
			ticketBuyingList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getTicketSellingList: PropTypes.func.isRequired,
			getTicketBuyingList: PropTypes.func.isRequired,
			toggleTicketPosterModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		// where: {},
	}

	state = {
		loading: true,
		loadingMore: false,
	}


	componentDidMount() {
		const p1 = new Promise((resolve) => {
			this.props.action.getTicketSellingList({ filter: this.filter, firstLoad: true }, () => {
				resolve();
			});
		});

		const p2 = new Promise((resolve) => {
			this.props.action.getTicketBuyingList({ filter: this.filter, firstLoad: true }, () => {
				resolve();
			});
		});

		Promise.all([
			p1,
			p2,
		]).then(() => {
			this.setState({ loading: false });
		});
	}

	tabKey = 'buying'

	filter = {
		limit: 4,
		skip: 0,
		page: 1,
		include: [
			{
				relation: 'creator',
				scope: {
					fields: ['id', 'username', 'avatar', 'fullName', 'ratingsCount', 'ratingsStats'],
				},
			},
			// {
			// 	relation: 'fbFeed',
			// },
		],
		where: {
			status: 'open',
			dueDate: {
				gte: new Date(),
			},
		},
	}

	handleViewMore = () => {
		this.setState({
			loadingMore: true,
		});

		this.filter.skip = this.filter.limit * this.filter.page;

		const p1 = new Promise((resolve, reject) => {
			this.props.action.getTicketSellingList({ filter: this.filter }, () => {
				resolve();
			}, () => {
				reject();
			});
		});

		const p2 = new Promise((resolve, reject) => {
			this.props.action.getTicketBuyingList({ filter: this.filter }, () => {
				resolve();
			}, () => {
				reject();
			});
		});

		Promise.all([
			p1,
			p2,
		]).then(() => {
			this.filter.page = this.filter.page + 1;
			this.setState({
				loadingMore: false,
			});
		}).catch(() => {
			this.setState({
				loadingMore: false,
			});
		});
	}

	handleSearch = (where) => {
		this.filter.where = {
			...this.filter.where,
			...where,
		};
		this.filter.skip = 0;
		this.filter.limit = 4;
		this.filter.page = 1;

		Promise.all([
			this.props.action.getTicketSellingList({ filter: this.filter, firstLoad: true }),
			this.props.action.getTicketBuyingList({ filter: this.filter, firstLoad: true }),
		]).then(() => {
			this.setState({ loading: false });
		});

		// this.props.action.getTicketSellingList({ filter: this.filter, firstLoad: true }, () => {
		// 	this.setState({ loading: false });
		// });
	}

	handleChangeTab = (key) => {
		this.tabKey = key;
	}

	handleCreate = (e) => {
		this.props.action.toggleTicketPosterModal({ open: true, type: this.tabKey });
	};

	render() {
		const { classes, action, store: { ticketBuyingList, ticketSellingList } } = this.props;

		if (this.state.loading || ticketBuyingList.loading || ticketSellingList.loading) {
			return (
				<Fragment>
					<MobileSearchBar />
					<Row gutter={20} className={classes.wrapperContent}>
						<div className={classes.border} />
						<Col span={12}>
							<Button type="primary" className={classes.btn}>Tìm mua</Button>
							{
								[0, 0, 0, 0].map((flight, index) => <MobileFlightCard key={index} loading />)
							}
						</Col>
						<Col span={12}>
							<Button type="primary" className={classes.btn}>Đăng bán</Button>
							{
								[0, 0, 0, 0].map((flight, index) => <MobileFlightCard key={index} loading />)
							}
						</Col>
					</Row>
				</Fragment>
			);
		}

		const isShowMore = (ticketBuyingList.data.length < ticketBuyingList.total) || (ticketSellingList.data.length < ticketSellingList.total);
		// const menu = (
		// 	<Menu onClick={this.handleMenuClick}>
		// 		<Menu.Item key="buying">Tìm Mua</Menu.Item>
		// 		<Menu.Item key="selling">Đăng Bán</Menu.Item>
		// 	</Menu>
		// );

		return (
			<div className={classes.root}>

				<MobileSearchBar onSearch={this.handleSearch} />
				<Tabs tabPosition="bottom" onChange={this.handleChangeTab}>
					<Tabs.TabPane tab="Tìm mua" key="buying">
						{
							ticketBuyingList.data.map(flight => <MobileFlightCard flightData={flight} key={`${flight.id}_${AuthStorage.userId}`} type="buying" />)
						}
					</Tabs.TabPane>
					<Tabs.TabPane tab="Đăng bán" key="selling">
						{
							ticketSellingList.data.map(flight => <MobileFlightCard flightData={flight} key={`${flight.id}_${AuthStorage.userId}`} type="selling" />)
						}
					</Tabs.TabPane>
				</Tabs>
				<div className={classes.createBtn}>
					<Button type="primary" shape="circle" icon="form" style={{ width: 50, height: 50, background: '#F2994A' }} onClick={this.handleCreate} />
				</div>

			</div>
		);
	}
}
