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
import { Icon, Button, Avatar } from 'antd';
// Store
import AuthStorage from 'src/utils/AuthStorage';

import Menu from './Menu';
import MenuMobile from './MenuMobile';
import AvatarBtn from './AvatarBtn';

const styles = (theme) => ({
	root: {
		height: '45px',

		'@media (max-width: 575.98px)': {
			height: '65px',
		},
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
		height: '45px',
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
	overlay: {
		position: 'fixed',
		width: '100vw',
		height: '100vh',
		background: '#000',
		zIndex: 9,
		opacity: 0.1,
	},
	contentMobile: {
		height: 65,
		background: 'linear-gradient(#5C8AE2, #485ABB)',
		display: 'flex',
	},
	headerMobile: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'center',
		padding: 15,
	},
});

@withStyles(styles)
export default class Header extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	}

	state = {
		active: false,
	}

	toggleMenu = () => {
		this.setState({ active: !this.state.active });
	}

	hideMenu = () => {
		this.setState({ active: false });
	}

	render() {
		const { classes } = this.props;

		return (
			<header className={classes.root}>
				<div className={classes.wrapper}>
					<Container className={classes.content + ' hidden-sm-down'}>
						<Link href="/">
							<a className={classes.left}>
								<img className={classes.logoImg} src="/static/assets/images/logo/1x.png" alt="Chove.vn" />
							</a>
						</Link>
						<div className={classes.right}>
							<Menu />
						</div>
					</Container>
					<Container className={classes.contentMobile + ' hidden-md-up'}>
						<div className={classes.headerMobile}>
							<Icon type={this.state.active ? 'menu-unfold' : 'menu-fold'} style={{ color: '#FFF', fontSize: 18 }} onClick={this.toggleMenu} />
							<Link href="/">
								<a className={classes.left}>
									<img style={{ height: 25 }} src="/static/assets/images/logo/mobile-2x.png" alt="Chove.vn" />
								</a>
							</Link>
							{
								AuthStorage.loggedIn ? <AvatarBtn isMobile /> : <a href="/login" style={{ color: '#FFF' }}>Đăng nhập</a>
							}
						</div>
						<MenuMobile active={this.state.active} />
						{
							this.state.active && <div className={classes.overlay} onClick={this.hideMenu} />
						}
					</Container>
				</div>
			</header>
		);
	}
}
