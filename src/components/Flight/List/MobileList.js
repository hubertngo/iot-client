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
import { injectIntl, intlShape } from 'react-intl';

import { Button, Col, Row, Tabs } from 'antd';

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
	},
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
@injectIntl
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
		intl: intlShape.isRequired,
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
			this.props.action.getTicketSellingList({ filter: this.filterSelling, firstLoad: true }, () => {
				resolve();
			});
		});

		const p2 = new Promise((resolve) => {
			this.props.action.getTicketBuyingList({ filter: this.filterBuying, firstLoad: true }, () => {
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

	filterBuying = {
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

	filterSelling = {
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

	handleViewMoreSelling = () => {
		this.setState({
			loadingMoreSelling: true,
		});

		this.filterSelling.skip = this.filterSelling.limit * this.filterSelling.page;

		this.props.action.getTicketSellingList({ filter: this.filterSelling }, () => {
			this.setState({
				loadingMoreSelling: false,
			});
		});
	}

	handleViewMoreBuying = () => {
		this.setState({
			loadingMoreBuying: true,
		});

		this.filterBuying.skip = this.filterBuying.limit * this.filterBuying.page;

		this.props.action.getTicketBuyingList({ filter: this.filterBuying }, () => {
			this.setState({
				loadingMoreBuying: false,
			});
		});
	}

	handleSearch = (where) => {
		if (this.tabKey === 'buying') {
			this.handleSearchBuying(where);
		} else {
			this.handleSearchSelling(where);
		}
	}

	handleSearchBuying = (where) => {
		this.filterBuying.where = {
			...this.filterBuying.where,
			...where,
		};
		this.filterBuying.skip = 0;
		this.filterBuying.limit = 4;
		this.filterBuying.page = 1;

		this.props.action.getTicketBuyingList({ filter: this.filterBuying, firstLoad: true }, () => {

			this.setState({ loading: false });
		});
	}

	handleSearchSelling = (where) => {
		this.filterSelling.where = {
			...this.filterSelling.where,
			...where,
		};
		this.filterSelling.skip = 0;
		this.filterSelling.limit = 4;
		this.filterSelling.page = 1;

		this.props.action.getTicketSellingList({ filter: this.filterSelling, firstLoad: true }, () => {

			this.setState({ loading: false });
		});
	}

	handleChangeTab = (key) => {
		this.tabKey = key;
	}

	handleCreate = () => {
		this.props.action.toggleTicketPosterModal({ open: true, type: this.tabKey });
	};

	render() {
		const { classes, store: { ticketBuyingList, ticketSellingList }, intl: { formatMessage } } = this.props;

		if (this.state.loading || ticketBuyingList.loading || ticketSellingList.loading) {
			return (
				<Fragment>
					<MobileSearchBar />
					<Row gutter={20} className={classes.wrapperContent}>
						<div className={classes.border} />
						<Col span={12}>
							<Button type="primary" className={classes.btn}>{formatMessage({ id: 'buying' })}</Button>
							{
								[0, 0, 0, 0].map((flight, index) => <MobileFlightCard key={index} loading />)
							}
						</Col>
						<Col span={12}>
							<Button type="primary" className={classes.btn}>{formatMessage({ id: 'selling' })}</Button>
							{
								[0, 0, 0, 0].map((flight, index) => <MobileFlightCard key={index} loading />)
							}
						</Col>
					</Row>
				</Fragment>
			);
		}

		const isShowMoreBuying = ticketBuyingList.data.length < ticketBuyingList.total;
		const isShowMoreSelling = ticketSellingList.data.length < ticketSellingList.total;
		// const menu = (
		// 	<Menu onClick={this.handleMenuClick}>
		// 		<Menu.Item key="buying">{formatMessage({ id: 'buying' })}</Menu.Item>
		// 		<Menu.Item key="selling">{formatMessage({ id: 'selling' })}</Menu.Item>
		// 	</Menu>
		// );

		return (
			<div className={classes.root}>
				<MobileSearchBar onSearch={this.handleSearch} />
				<Tabs tabPosition="bottom" onChange={this.handleChangeTab}>
					<Tabs.TabPane tab={formatMessage({ id: 'buying' })} key="buying">
						{
							ticketBuyingList.data.map(flight => <MobileFlightCard flightData={flight} key={`${flight.id}_${AuthStorage.userId}`} type="buying" />)
						}
						{
							isShowMoreBuying && (
								<Col span={24}>
									<Button style={{ width: '100%' }} size="large" onClick={this.handleViewMoreBuying} loading={this.state.loadingMoreBuying}>{formatMessage({ id: 'show_more' })}</Button>
								</Col>
							)
						}
					</Tabs.TabPane>
					<Tabs.TabPane tab={formatMessage({ id: 'selling' })} key="selling">
						{
							ticketSellingList.data.map(flight => <MobileFlightCard flightData={flight} key={`${flight.id}_${AuthStorage.userId}`} type="selling" />)
						}
						{
							isShowMoreSelling && (
								<Col span={24}>
									<Button style={{ width: '100%' }} size="large" onClick={this.handleViewMoreSelling} loading={this.state.loadingMoreSelling}>{formatMessage({ id: 'show_more' })}</Button>
								</Col>
							)
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
