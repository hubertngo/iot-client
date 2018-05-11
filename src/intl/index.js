/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:21
*------------------------------------------------------- */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import NProgress from 'nprogress';

import { Router } from 'src/routes';

import withReduxSaga from 'src/redux/store';
import withJss from 'src/theme/jss';

import AuthStorage from 'src/utils/AuthStorage';
import { getUserAuth } from 'src/redux/actions/auth';
import { LocaleProvider } from 'antd';
// import LoaderGlobal from 'src/components/LoaderGlobal';
import LoginModal from 'src/components/Modals/Login';
import SignUpModal from 'src/components/Modals/SignUp';
import TicketPosterModal from 'src/components/Modals/TicketPoster';
import UserInfoModal from 'src/components/Modals/UserInfo';
import EditUserInfoModal from 'src/components/Modals/EditUserInfo';
import RatingModal from 'src/components/Modals/Rating';
import EditBuyingModal from 'src/components/Modals/EditBuying';
import EditSellingModal from 'src/components/Modals/EditSelling';

import { addTicketBuyingListener } from 'src/redux/actions/ticket-buying';
import { addTicketSellingListener } from 'src/redux/actions/ticket-selling';
import { IntlProvider } from 'react-intl';
import fr_FR from 'antd/lib/locale-provider/fr_FR';
import en_US from 'antd/lib/locale-provider/en_US';
import vi_VN from 'antd/lib/locale-provider/vi_VN';
import 'moment/locale/fr';
import 'moment/locale/vi';
import vi from 'src/lang/vi.json';
import en from 'src/lang/en.json';
import { connect } from 'react-redux';

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
	};
};

const withIntl = (Child) => {
	class WrappedComponent extends PureComponent {
		static propTypes = {
		}

		state = {}

		render() {
			return (
				<LocaleProvider locale={vi_VN}>
					<IntlProvider locale="en" messages={vi}>
						<Child />
					</IntlProvider>
				</LocaleProvider>
			);
		}
	}

	// return WrappedComponent;
	return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withIntl;
