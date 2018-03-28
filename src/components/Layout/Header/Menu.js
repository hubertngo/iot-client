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

// Styles
import withStyles from 'src/theme/jss/withStyles';

// Actions
import { toggleLoginModal, toggleTicketPosterModal } from 'src/redux/actions/modal';

// Store
import AuthStorage from 'src/utils/AuthStorage';

// Components
import Avatar from 'src/components/Photo/Avatar';
import CheckLogin from 'src/components/Form/CheckLogin';
import AvatarBtn from './AvatarBtn';
import UserDropdown from './UserDropdown';
import { Icon, Dropdown } from 'antd';

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
		padding: '9px',
		cursor: 'pointer',
		'& div': {
			borderRadius: '3px',
			color: 'white',
			background: theme.palette.primary[500],
			height: '30px',
			lineHeight: '30px',
			padding: '0 10px',
		},
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
			toggleTicketPosterModal,
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
			toggleTicketPosterModal: PropTypes.func.isRequired,
		}).isRequired,
		router: PropTypes.object.isRequired,
	}

	handleOpenLogin = (e) => {
		e.preventDefault();
		this.props.action.toggleLoginModal({ open: true });
	}

	handleOpenTicketPoster = () => {
		// e.preventDefault();
		this.props.action.toggleTicketPosterModal({ open: true });
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
						{/* {
							!AuthStorage.loggedIn && !auth.id &&
							<li className={classes.loginBtn}>
								<a href="/login" onClick={this.handleOpenLogin}>Đăng nhập</a>
							</li>
						} */}
						<li className={classes.postBtn}>
							<CheckLogin onClick={this.handleOpenTicketPoster}>
								<div>Đăng tin</div>
							</CheckLogin>
						</li>
						<li className={classes.loggedUser}>
							<Dropdown overlay={<UserDropdown />} trigger={['click']}>
								<div>
									<span> <Avatar style={{ marginBottom: 5, cursor: 'pointer' }} size={30} /> </span>
									<span> <Icon type="down" style={{ marginLeft: '5px', fontWeight: 'bold', cursor: 'pointer' }} /> </span>
								</div>
							</Dropdown>
						</li>
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

