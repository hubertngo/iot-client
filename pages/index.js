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

import BasicLayout from 'src/layout/basic';
import Index from 'src/components/Pages/Index';

@withRoot
export default class IndexPage extends PureComponent {
	// static async getInitialProps({ isServer, store }) {

	// }

	render() {
		return (
			<BasicLayout>
				<Head>
					<title>IOT Client</title>
				</Head>
				<Index />

			</BasicLayout>
		);
	}
}
