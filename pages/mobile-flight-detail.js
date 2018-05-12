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
import { Router } from 'src/routes';

// import SignUpForm from 'src/components/Form/SignUp';
import MobileFlightDetailWrapper from 'src/components/Flight/Card/_MobileDetailWrapper';
import { getTicketSellingData } from 'src/redux/actions/ticket-selling';
import { getTicketBuyingData } from 'src/redux/actions/ticket-buying';

function mapStateToProps(state) {
	return {
		store: {
			// ticketSellingView: state.getIn(['ticketSelling', 'view']),
			// ticketBuyingView: state.getIn(['ticketBuying', 'view']),
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
// @connect(mapStateToProps, mapDispatchToProps)
export default class MobileFlightDetailPage extends PureComponent {
	static async getInitialProps(ctx) {
		return {
			id: ctx.query.id,
			type: ctx.asPath.includes('ticket-selling') ? 'selling' : 'buying',
		};
	}

	static propTypes = {
		// store
		// store: PropTypes.shape({
		// 	modal: PropTypes.object.isRequired,
		// }).isRequired,
		// // action
		// action: PropTypes.shape({
		// 	toggleFlightModal: PropTypes.func.isRequired,
		// 	getTicketSellingData: PropTypes.func.isRequired,
		// 	getTicketBuyingData: PropTypes.func.isRequired,
		// }).isRequired,
		// id: PropTypes.string.isRequired,
		// type: PropTypes.string.isRequired,
	}

	// constructor(props) {
	// 	super(props);
	// 	if (typeof window !== 'undefined') {
	// 		if (window.innerWidth >= 992) {
	// 			Router.pushRoute(`/?ticketId=${this.props.id}&type=${this.props.type}`);
	// 		}
	// 	}
	// }

	render() {
		return (
			<MainLayout>
				<Head>
					<title>Chove.vn - Đăng ký</title>
				</Head>
				<div style={{ padding: 10 }}>
					<MobileFlightDetailWrapper id={this.props.id} type={this.props.type} />
				</div>
			</MainLayout>
		);
	}
}
