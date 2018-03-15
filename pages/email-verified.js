/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-10 14:39:40
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import withRoot from 'src/root';

import MainLayout from 'src/layout/Main';

@withRoot
export default class EmailVerified extends PureComponent {
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
					<title>Chove.vn - Xác nhận mật khẩu</title>
				</Head>
				<div style={{ margin: '50px 0', textAlign: 'center' }}>
					<div style={{ margin: '0 auto 30px', textAlign: 'center', background: '#fff', width: 300, padding: 50 }}>
						Chúc mừng bạn đã xác nhận email thành công.
					</div>
					<Link href="/login">
						<a>Login</a>
					</Link>
				</div>
			</MainLayout>
		);
	}
}
