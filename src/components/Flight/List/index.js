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

import { Button, Col, Row } from 'antd';

import withStyles from 'src/theme/jss/withStyles';
import SearchBar from 'src/components/Form/SearchBar';
import CheckLogin from 'src/components/Form/CheckLogin';

import { getTicketSellingList } from 'src/redux/actions/ticket-selling';
import { getTicketBuyingList } from 'src/redux/actions/ticket-buying';
import { toggleTicketPosterModal } from 'src/redux/actions/modal';

import FlightCard from '../Card';
import AuthStorage from '../../../utils/AuthStorage';

const styleSheet = (/* theme */) => ({
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
	btnMore: {
		width: '100%',
		boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15)',
		border: '0',
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
export default class FlightList extends Component {
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

	render() {
		const { classes, action, store: { ticketBuyingList, ticketSellingList }, intl: { formatMessage } } = this.props;

		if (this.state.loading || ticketBuyingList.loading || ticketSellingList.loading) {
			return (
				<Fragment>
					<SearchBar />
					<Row gutter={20} className={classes.wrapperContent}>
						<div className={classes.border} />
						<Col span={12}>
							<Button type="primary" className={classes.btn}>{formatMessage({ id: 'buying' })}</Button>
							{
								[0, 0, 0, 0].map((flight, index) => <FlightCard key={index} loading />)
							}
						</Col>
						<Col span={12}>
							<Button type="primary" className={classes.btn}>{formatMessage({ id: 'selling' })}</Button>
							{
								[0, 0, 0, 0].map((flight, index) => <FlightCard key={index} loading />)
							}
						</Col>
					</Row>
				</Fragment>
			);
		}

		const isShowMore = (ticketBuyingList.data.length < ticketBuyingList.total) || (ticketSellingList.data.length < ticketSellingList.total);

		return (
			<Fragment>
				<SearchBar onSearch={this.handleSearch} />
				<Row gutter={20} className={classes.wrapperContent}>
					<div className={classes.border} />
					<Col span={12}>
						<CheckLogin onClick={() => action.toggleTicketPosterModal({ open: true, type: 'buying' })}>
							<Button type="primary" className={classes.btn} >{formatMessage({ id: 'buying' })}</Button>
						</CheckLogin>
						{
							ticketBuyingList.data.map(flight => <FlightCard flightData={flight} key={`${flight.id}_${AuthStorage.userId}`} type="buying" />)
						}
					</Col>
					<Col span={12}>
						<CheckLogin onClick={() => action.toggleTicketPosterModal({ open: true, type: 'selling' })}>
							<Button type="primary" className={classes.btn} >{formatMessage({ id: 'selling' })}</Button>
						</CheckLogin>
						{
							ticketSellingList.data.map(flight => <FlightCard flightData={flight} key={`${flight.id}_${AuthStorage.userId}`} type="selling" />)
						}
					</Col>
					{
						isShowMore && (
							<Col span={24}>
								<Button className={classes.btnMore} size="large" onClick={this.handleViewMore} loading={this.state.loadingMore}>{formatMessage({ id: 'show_more' })}</Button>
							</Col>
						)
					}
				</Row>
			</Fragment>
		);
	}
}
