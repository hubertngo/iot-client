/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:32:12
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';

// import AuthStorage from 'src/utils/AuthStorage';

import MainLayout from 'src/layout/Main';

import SignUpForm from 'src/components/Form/SignUp';

@withRoot
export default class SignUpPage extends PureComponent {
	static async getInitialProps(/* ctx */) {
		// if (AuthStorage.loggedIn) {
		// 	ctx.store.dispatch(getUserAuth());
		// }
		// return { auth: ctx.store.getState().auth };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>Chove.vn - Đăng ký</title>
				</Head>
				<div style={{ margin: '50px 0', textAlign: 'center' }}>
					<SignUpForm isSingUpPage />
				</div>
			</MainLayout>
		);
	}
}
