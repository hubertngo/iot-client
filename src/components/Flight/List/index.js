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

import { Button, Col, Row } from 'antd';
import partition from 'lodash/partition';

import withStyles from 'src/theme/jss/withStyles';
import SearchBar from 'src/components/Form/SearchBar';

import { getFlightList } from 'src/redux/actions/flight';

import FlightCard from '../Card';

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
});

const mapStateToProps = (state) => {
	return {
		store: {
			auth: state.getIn('auth'),
			flightList: state.getIn(['flight', 'flightList']),
		},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getFlightList,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
export default class FlightList extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		where: PropTypes.object,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
			flightList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getFlightList: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		where: {},
	}

	state = {
		loading: true,
		loadingMore: false,
	}

	componentDidMount() {
		this.filter.where = { ...this.filter.where, ...this.props.where };
		this.props.action.getFlightList({ filter: this.filter, firstLoad: true }, () => {
			this.setState({ loading: false });
		});
	}

	filter = {
		limit: 4,
		skip: 0,
		page: 1,
		include: [
			{
				relation: 'seller',
				scope: {
					fields: ['id', 'username', 'avatar', 'fullName'],
				},
			},
			{
				relation: 'buyer',
				scope: {
					fields: ['id', 'username', 'avatar', 'fullName'],
				},
			},
		],
		where: {
			status: 'Open',
		},
	}

	handleViewMore = () => {
		this.setState({
			loadingMore: true,
		});

		this.filter.skip = this.filter.limit * this.filter.page;
		this.props.action.getFlightList({ filter: this.filter }, () => {
			this.filter.page = this.filter.page + 1;
			this.setState({
				loadingMore: false,
			});
		}, () => {
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

		this.props.action.getFlightList({ filter: this.filter, firstLoad: true }, () => {
			this.setState({ loading: false });
		});
	}

	render() {
		const { classes } = this.props;
		const [flightListSell, flightListBuy] = partition(this.props.store.flightList.data, (item) => item.type === 'Sell');

		// const flightListBuy = [
		// 	{
		// 		author: {
		// 			fullname: 'Trịnh Thu Hương',
		// 		},
		// 		updatedTime: '12/02/2018 16:08',
		// 		content: 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018',
		// 		link: 'https://dulichgiare.com.vn/vemaybay/147dqe',
		// 		departure: 'Nha Trang',
		// 		destination: 'Hải Phòng',
		// 		agency: null,
		// 		type: 'sell',
		// 		dueDate: '12/02/2018 16:08',
		// 		startDate: '12/02/2018',
		// 		startPrice: 1200000,
		// 		currentPrice: 1300000,
		// 		bidderId: 1,
		// 		rate: 3,
		// 		stock: 1,
		// 	},
		// 	{
		// 		author: {
		// 			fullname: 'Trịnh Thu Hương',
		// 		},
		// 		updatedTime: '12/02/2018 16:08',
		// 		content: 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018',
		// 		link: 'https://dulichgiare.com.vn/vemaybay/147dqe',
		// 		departure: 'Nha Trang',
		// 		destination: 'Hải Phòng',
		// 		agency: 'vna',
		// 		type: 'sell',
		// 		dueDate: '12/02/2018 16:08',
		// 		startDate: '12/02/2018',
		// 		startPrice: 1200000,
		// 		currentPrice: 1300000,
		// 		bidderId: 1,
		// 		rate: 3,
		// 		stock: 1,
		// 	},
		// 	{
		// 		author: {
		// 			fullname: 'Trịnh Thu Hương',
		// 		},
		// 		updatedTime: '12/02/2018 16:08',
		// 		content: 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018',
		// 		link: 'https://dulichgiare.com.vn/vemaybay/147dqe',
		// 		departure: 'Nha Trang',
		// 		destination: 'Hải Phòng',
		// 		agency: 'jetstar',
		// 		type: 'sell',
		// 		dueDate: '12/02/2018 16:08',
		// 		startDate: '12/02/2018',
		// 		startPrice: 1200000,
		// 		currentPrice: 1300000,
		// 		bidderId: 1,
		// 		rate: 3,
		// 		stock: 1,
		// 	},
		// ];

		// const flightListSell = [
		// 	{
		// 		author: {
		// 			fullname: 'Trịnh Thu Hương',
		// 		},
		// 		updatedTime: '12/02/2018 16:08',
		// 		content: 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018',
		// 		link: 'https://dulichgiare.com.vn/vemaybay/147dqe',
		// 		departure: 'Nha Trang',
		// 		destination: 'Hải Phòng',
		// 		agency: 'vietjet',
		// 		type: 'bid',
		// 		dueDate: '06/04/2018 16:08',
		// 		startDate: '28/03/2018',
		// 		startPrice: 1200000,
		// 		currentPrice: 1300000,
		// 		bidderId: 1,
		// 		rate: 3,
		// 		stock: 1,
		// 		isHot: true,
		// 	},
		// 	{
		// 		author: {
		// 			fullname: 'Trịnh Minh Hằng',
		// 		},
		// 		updatedTime: '12/04/2018 16:08',
		// 		content: 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018',
		// 		link: 'https://dulichgiare.com.vn/vemaybay/147dqe',
		// 		departure: 'Nha Trang',
		// 		destination: 'Hải Phòng',
		// 		agency: 'jetstar',
		// 		type: 'buy',
		// 		dueDate: '12/04/2018 16:08',
		// 		startDate: '28/03/2018',
		// 		startPrice: 1200000,
		// 		currentPrice: 1300000,
		// 		bidderId: 1,
		// 		rate: 3,
		// 		stock: 1,
		// 	},
		// 	{
		// 		author: {
		// 			fullname: 'Nguyễn Thành Trung',
		// 		},
		// 		updatedTime: '20/04/2018 16:08',
		// 		content: 'Tìm mua vé máy bay một chiều Nha Trang - Hải Phòng bay ngày 8/11/2018',
		// 		link: 'https://dulichgiare.com.vn/vemaybay/147dqe',
		// 		departure: 'Nha Trang',
		// 		destination: 'Hải Phòng',
		// 		agency: 'vna',
		// 		type: 'buy',
		// 		dueDate: '20/04/2018 16:08',
		// 		startDate: '28/03/2018',
		// 		startPrice: 1200000,
		// 		currentPrice: 1300000,
		// 		bidderId: 1,
		// 		rate: 3,
		// 		stock: 1,
		// 	},
		// ];

		if (this.state.loading) {
			return (
				<Fragment>
					<SearchBar />
					<Row gutter={20} className={classes.wrapperContent}>
						<div className={classes.border} />
						<Col span={12}>
							<Button type="primary" className={classes.btn}>Tìm mua</Button>
							{
								[0, 0].map((flight, index) => <FlightCard key={index} loading />)
							}
						</Col>
						<Col span={12}>
							<Button type="primary" className={classes.btn}>Đăng bán</Button>
							{
								[0, 0].map((flight, index) => <FlightCard key={index} loading />)
							}
						</Col>
					</Row>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<SearchBar onSearch={this.handleSearch} />
				<Row gutter={20} className={classes.wrapperContent}>
					<div className={classes.border} />
					<Col span={12}>
						<Button type="primary" className={classes.btn}>Tìm mua</Button>
						{
							flightListBuy.map(flight => <FlightCard flight={flight} key={flight.id} />)
						}
					</Col>
					<Col span={12}>
						<Button type="primary" className={classes.btn}>Đăng bán</Button>
						{
							flightListSell.map(flight => <FlightCard flight={flight} key={flight.id} />)
						}
					</Col>
					<Col span={24}>
						<Button style={{ width: '100%' }} size="large" onClick={this.handleViewMore} loading={this.state.loadingMore}>Xem thêm</Button>
					</Col>
				</Row>
			</Fragment>
		);
	}
}
