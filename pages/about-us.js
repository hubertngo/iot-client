/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-10 14:39:40
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';

import MainLayout from 'src/layout/Main';

@withRoot
export default class AboutUs extends PureComponent {
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
					<title>Chove.vn - About us</title>
				</Head>
				<div>About us page</div>
			</MainLayout>
		);
	}
}
