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

import Router from 'next/router';

import withReduxSaga from 'src/redux/store';
import withJss from 'src/theme/jss';

import AuthStorage from 'src/utils/AuthStorage';
import { getUserAuth } from 'src/redux/actions/auth';

// import LoaderGlobal from 'src/components/LoaderGlobal';
import LoginModal from 'src/components/Modals/Login';
import SignUpModal from 'src/components/Modals/SignUp';
import TicketPosterModal from 'src/components/Modals/TicketPoster';
import UserInfoModal from 'src/components/Modals/UserInfo';
import EditUserInfoModal from 'src/components/Modals/EditUserInfo';

Router.onRouteChangeStart = (/* url */) => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const withRoot = (Child) => {
	@withJss
	@withReduxSaga
	class WrappedComponent extends PureComponent {
		static propTypes = {
			url: PropTypes.object.isRequired,
		}

		static async getInitialProps(ctx) {
			if (!process.browser) {
				cookie.plugToRequest(ctx.req, ctx.res);
			}

			if (AuthStorage.loggedIn && !ctx.store.getState().get('auth').toJS().email) {
				await ctx.store.dispatch(getUserAuth());
			}

			if (Child.getInitialProps) {
				return Child.getInitialProps(ctx);
			}

			return {};
		}

		render() {
			return (
				<Fragment>
					<Child {...this.props} />
					<LoginModal />
					<SignUpModal />
					<TicketPosterModal />
					<UserInfoModal />
					<EditUserInfoModal />
				</Fragment>
			);
		}
	}

	return WrappedComponent;
};

export default withRoot;
