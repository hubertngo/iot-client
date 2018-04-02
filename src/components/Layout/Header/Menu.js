/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 14:39:16
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import Link from 'next/link';

// Styles
import withStyles from 'src/theme/jss/withStyles';

// Actions
import { toggleLoginModal } from 'src/redux/actions/modal';

// Store
import AuthStorage from 'src/utils/AuthStorage';

// Components
import BtnTicketPoster from 'src/components/Form/BtnTicketPoster';

import AvatarBtn from './AvatarBtn';

const styleSheet = (theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	menu: {
		'& ul': {
			display: 'flex',
			padding: '0',
			listStyle: 'none',
			margin: 0,
			'& li': {
				height: '46px',
				display: 'flex',
				alignItems: 'center',
				'& a': {
					color: 'black',
					padding: '0 15px',
					display: 'block',
					textDecoration: 'none',
					fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
					// fontWeight: '500',
					fontSize: '0.85rem',
				},
			},
		},
	},
	chosenTab: {
		borderBottom: `3px solid ${theme.palette.secondary[500]}`,
		fontWeight: 'bold',
	},
	button: {
		fontSize: '1.4rem',
		// color: Color(theme.palette.primary.main).darken(0.5).hex(),
		color: '#fff',
	},
	btnAdd: {
		margin: '0 15px 0 10px',
		textTransform: 'uppercase',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontWeight: '500',
	},
	loginBtn: {
		'& a': {
			color: 'white !important',
		},
		background: theme.palette.secondary[500],
		padding: '0',
	},
	postBtn: {
		display: 'flex',
		alignItems: 'center',
		margin: '0 20px',
	},
	loggedUser: {
		padding: '9px',
		'& div': {
			height: '30px',
			lineHeight: '30px',
			'& img': {
				borderRadius: '50%',
				width: '28px',
				height: '28px',
			},
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleLoginModal,
		}, dispatch),
	};
};

@withRouter
@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
export default class Menu extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleLoginModal: PropTypes.func.isRequired,
		}).isRequired,
		router: PropTypes.object.isRequired,
	}

	handleOpenLogin = (e) => {
		e.preventDefault();
		this.props.action.toggleLoginModal({ open: true });
	}

	isAtCurrentRoute = (checkingRoute, currentRoute) => {
		return checkingRoute === '/' ? checkingRoute === currentRoute.pathname : currentRoute.pathname.indexOf(checkingRoute) >= 0;
	}

	render() {
		const { classes, store: { auth }, router } = this.props;
		const { isAtCurrentRoute } = this;
		return (
			<div className={classes.root}>
				<nav className={classes.menu}>
					<ul>
						<li className={isAtCurrentRoute('/', router) && classes.chosenTab}>
							<Link href="/">
								<a>Tìm kiếm vé</a>
							</Link>
						</li>
						<li className={isAtCurrentRoute('/about-us', router) && classes.chosenTab}>
							<Link href="/about-us">
								<a>Về chúng tôi</a>
							</Link>
						</li>
						<li className={isAtCurrentRoute('/blog', router) && classes.chosenTab}>
							<Link href="/blog">
								<a>Blog</a>
							</Link>
						</li>
						{
							!AuthStorage.loggedIn && !auth.id &&
							<li className={classes.loginBtn}>
								<a href="/login" onClick={this.handleOpenLogin}>Đăng nhập</a>
							</li>
						}
						{
							AuthStorage.loggedIn &&
							<li className={classes.postBtn}>
								<BtnTicketPoster />
							</li>
						}
					</ul>
				</nav>
				{
					AuthStorage.loggedIn &&
					<AvatarBtn />
				}
			</div>
		);
	}
}

