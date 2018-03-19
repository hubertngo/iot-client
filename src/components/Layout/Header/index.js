/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-09 17:44:33
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import withStyles from 'src/theme/jss/withStyles';

import Container from 'src/components/Layout/Container';

import Menu from './Menu';

const styles = (theme) => ({
	root: {
		height: '45px',
	},
	wrapper: {
		position: 'fixed',
		width: '100%',
		height: '45px',
		zIndex: '9',
		background: '#fff',
		boxShadow: '1px 0px 3px rgba(0, 0, 0, 0.3)',
	},
	content: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 0 0 15px',
		height: '45px',
		width: '100%',
	},
	left: {
		display: 'flex',
		alignItems: 'center',
	},
	right: {
		display: 'flex',
		alignContent: 'center',
	},
	logoImg: {
		height: 30,
	},
});

@withStyles(styles)
export default class Header extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	}

	render() {
		const { classes } = this.props;

		return (
			<header className={classes.root}>
				<div className={classes.wrapper}>
					<Container className={classes.content}>
						<Link href="/">
							<a className={classes.left}>
								<img className={classes.logoImg} src="/static/assets/images/logo/1x.png" alt="Chove.vn" />
							</a>
						</Link>
						<div className={classes.right}>
							<Menu />
						</div>
					</Container>
				</div>
			</header>
		);
	}
}
