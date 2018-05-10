/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:32:12
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withRoot from 'src/root';
import { connect } from 'react-redux';
// import AuthStorage from 'src/utils/AuthStorage';
import { bindActionCreators } from 'redux';
import MainLayout from 'src/layout/Main';

import SignUpForm from 'src/components/Form/SignUp';
import MobileFlightDetail from 'src/components/Flight/Card/MobileDetail';
import { getTicketSellingData } from 'src/redux/actions/ticket-selling';
import { getTicketBuyingData } from 'src/redux/actions/ticket-buying';

function mapStateToProps(state) {
	return {
		store: {
			ticketSellingView: state.getIn(['ticketSelling', 'view']),
			ticketBuyingView: state.getIn(['ticketBuying', 'view']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getTicketSellingData,
			getTicketBuyingData,
		}, dispatch),
	};
};

@withRoot
@connect(mapStateToProps, mapDispatchToProps)
export default class MobileFlightDetailPage extends PureComponent {

	static async getInitialProps(ctx) {
		return {
			id: ctx.query.id,
			type: ctx.asPath.includes('ticket-selling') ? 'selling' : 'buying',
		};
	}

	static propTypes = {
		// store
		store: PropTypes.shape({
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleFlightModal: PropTypes.func.isRequired,
			getTicketSellingData: PropTypes.func.isRequired,
			getTicketBuyingData: PropTypes.func.isRequired,
		}).isRequired,
		id: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	}


	componentDidMount() {
		const { id, type } = this.props;

		if (id) {
			const params = {
				id,
				filter: {
					include: [
						{
							relation: 'creator',
							scope: {
								fields: ['id', 'username', 'avatar', 'fullName', 'ratingsCount', 'ratingsStats'],
							},
						},
					],
				},
			};

			if (type === 'selling') {
				this.props.action.getTicketSellingData(params);
			} else {
				this.props.action.getTicketBuyingData(params);
			}
		}
	}

	render() {
		const { store: { ticketSellingView, ticketBuyingView }, type } = this.props;
		const flightData = type === 'selling' ? ticketSellingView : ticketBuyingView;

		return (
			<MainLayout>
				<Head>
					<title>Chove.vn - Đăng ký</title>
				</Head>
				<div style={{ padding: 10 }}>
					<MobileFlightDetail flightData={flightData} type={type} onCancel={this.handleCancel} />
				</div>
			</MainLayout>
		);
	}
}
