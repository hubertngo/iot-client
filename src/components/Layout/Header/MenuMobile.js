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

const styleSheet = (theme) => ({
	root: {
		position: 'fixed',
		top: 65,
		width: 0,
		height: 'calc(100vh - 65px)',
		background: '#FFF',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		transition: 'width 300ms ease',
		overflow: 'hidden',
		zIndex: 10,

		'&.active': {
			width: 300,
		},

		'& ul': {
			listStyle: 'none',
			padding: 0,
			margin: 0,
		},

		'& li': {
			padding: '20px 30px',
			borderBottom: '1px solid #F2F2F2',
		},

		'& a': {
			color: 'inherit',
		},
	},
	chosenTab: {
		color: theme.palette.primary[500],
		// borderBottom: `3px solid ${theme.palette.secondary[500]}`,
		// fontWeight: 'bold',
	},
	bottomMenu: {
		background: '#F6F8FD',
	}
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
export default class MenuMobile extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			toggleLoginModal: PropTypes.func.isRequired,
		}).isRequired,
		router: PropTypes.object.isRequired,
		active: PropTypes.bool.isRequired,
	}

	handleOpenLogin = (e) => {
		e.preventDefault();
		this.props.action.toggleLoginModal({ open: true });
	}

	isAtCurrentRoute = (checkingRoute, currentRoute) => {
		return checkingRoute === '/' ? checkingRoute === currentRoute.pathname : currentRoute.pathname.indexOf(checkingRoute) >= 0;
	}

	render() {
		const { classes, active, router } = this.props;

		return (
			<div className={[classes.root, active ? 'active' : ''].join(' ')}>
				<div>
					<ul>
						<li className={this.isAtCurrentRoute('/', router) ? classes.chosenTab : ''}>
							<Link href="/">
								<a>Vé máy bay</a>
							</Link>
						</li>
						<li>Phòng khách sạn</li>
						<li>Voucher</li>
					</ul>
				</div>
				<div className={classes.bottomMenu}>
					<ul>
						<li className={this.isAtCurrentRoute('/about-us', router) ? classes.chosenTab : ''}>
							<Link href="/about-us">
								<a>Về chúng tôi</a>
							</Link>
						</li>
						<li className={this.isAtCurrentRoute('/blog', router) ? classes.chosenTab : ''}>
							<Link href="/blog">
								<a>Blog</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

