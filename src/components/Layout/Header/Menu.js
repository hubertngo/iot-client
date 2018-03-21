/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 14:39:16
*------------------------------------------------------- */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import Link from 'next/link';

import withStyles from 'src/theme/jss/withStyles';

import AuthStorage from 'src/utils/AuthStorage';

import { toggleLoginModal } from 'src/redux/actions/modal';

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
				'& a': {
					color: 'black',
					padding: '0 15px',
					display: 'block',
					textDecoration: 'none',
					fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
					// fontWeight: '500',
					fontSize: '0.85rem',
					height: '45px',
					lineHeight: '48px',
				},
			},
		},
	},
	chosenTab: {
		borderBottom: '3px solid #FF8100',
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
		background: '#FF8100',
		padding: '0',
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

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
class Menu extends Component {
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
		return currentRoute.pathname.indexOf(checkingRoute) >= 0;
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
								Tìm kiếm vé
							</Link>
						</li>
						<li className={isAtCurrentRoute('/vechungtoi', router) && classes.chosenTab}>
							<Link href="/vechungtoi">
								Về chúng tôi
							</Link>
						</li>
						<li className={isAtCurrentRoute('/blog', router) && classes.chosenTab}>
							<Link href="/blog">
								Blog
							</Link>
						</li>
						{
							!AuthStorage.loggedIn && !auth.id &&
							<li className={classes.loginBtn}>
								<a href="/login" onClick={this.handleOpenLogin}>Đăng nhập</a>
							</li>
						}
					</ul>
				</nav>
				{/* <BtnAddQuestion node={<Button className={classes.btnAdd} type="primary" ghost>Tạo câu hỏi</Button>} /> */}
				{
					AuthStorage.loggedIn &&
					<AvatarBtn />
				}
			</div>
		);
	}
}

export default withRouter(Menu);
