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
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import Router from 'next/router';

import withReduxSaga from 'src/redux/store';
import withJss from 'src/theme/jss';
import enUS from 'antd/lib/locale-provider/en_US';
import viVN from 'antd/lib/locale-provider/vi_VN';
import 'moment/locale/fr';
import 'moment/locale/vi';
import vi from 'src/lang/vi.json';
import en from 'src/lang/en.json';

import AuthStorage from 'src/utils/AuthStorage';
import { getUserAuth } from 'src/redux/actions/auth';

// import LoaderGlobal from 'src/components/LoaderGlobal';
import LoginModal from 'src/components/Modals/Login';
import SignUpModal from 'src/components/Modals/SignUp';
import UserInfoModal from 'src/components/Modals/UserInfo';
import EditUserInfoModal from 'src/components/Modals/EditUserInfo';

import { connect } from 'react-redux';

Router.onRouteChangeStart = (/* url */) => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const mapStateToProps = (state) => {
	return {
		store: {
			// auth: state.get('auth').toJS(),
			lang: state.get('lang'),
		},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const withRoot = (Child) => {
	@withJss
	@withReduxSaga
	@connect(mapStateToProps, mapDispatchToProps)
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

		componentDidMount() {
		}

		render() {
			const { lang } = this.props.store;

			return (
				<LocaleProvider locale={lang === 'vi' ? viVN : enUS}>
					<IntlProvider locale="en" messages={lang === 'vi' ? vi : en} key={lang}>
						<Fragment>
							<Child {...this.props} />
							<LoginModal />
							<SignUpModal />
							<UserInfoModal />
							<EditUserInfoModal />
						</Fragment>
					</IntlProvider>
				</LocaleProvider>
			);
		}
	}

	return WrappedComponent;
};

export default withRoot;
