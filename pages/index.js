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

import MainLayout from 'src/layout/Main';
import Index from 'src/components/Pages/Index';

@withRoot
export default class IndexPage extends PureComponent {
	// static async getInitialProps({ isServer, store }) {

	// }

	render() {
		return (
			<MainLayout>
				<Head>
					<title>Chove.vn - Sang nhượng vé rẻ khắp mọi nơi!</title>
				</Head>
				<Index />

			</MainLayout>
		);
	}
}
