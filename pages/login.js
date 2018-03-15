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
import withStyles from 'src/theme/jss/withStyles';

// import AuthStorage from 'src/utils/AuthStorage';

import MainLayout from 'src/layout/Main';

import LoginForm from 'src/components/Form/Login';

const styleSheet = (/* theme */) => ({
	root: {
		textAlign: 'center',
	},
	content: {
		display: 'inline-flex',
		margin: '50px 0',
	},
	img: {
		borderRadius: '0 8px 8px 0',
		width: 400,
		backgroundImage: 'url("/static/assets/images/banner.jpeg")',
		backgroundPosition: '560px',
		backgroundSize: 'cover',
		position: 'relative',
		'&:after': {
			position: 'absolute',
			content: '""',
			background: 'rgba(67, 104, 196, 0.4)',
			height: '100%',
			width: '100%',
			right: '0',
			top: '0',
			bottom: '0',
			left: '0',
		},
	},
});

@withRoot
@withStyles(styleSheet)
export default class LoginPage extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	}

	static async getInitialProps(/* ctx */) {
		// if (AuthStorage.loggedIn) {
		// 	ctx.store.dispatch(getUserAuth());
		// }
		// return { auth: ctx.store.getState().auth };
	}

	render() {
		const { classes } = this.props;

		return (
			<MainLayout>
				<Head>
					<title>Chove.vn - Đăng nhập</title>
				</Head>
				<div className={classes.root}>
					<div className={classes.content}>
						<LoginForm isLoginPage style={{ borderRadius: '8px 0 0 8px' }} />
						<div className={classes.img} />
					</div>
				</div>
			</MainLayout>
		);
	}
}
