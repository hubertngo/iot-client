/* --------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-01-12 15:38:42
 *------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { notification } from 'antd';

import Router from 'next/router';

import withStyles from 'src/theme/jss/withStyles';

import FacebookIcon from 'react-icons/lib/fa/facebook-official';

import AuthStorage from 'src/utils/AuthStorage';

import { loginFacebook } from 'src/redux/actions/auth';
import { toggleSignUpModal, toggleLoginModal } from 'src/redux/actions/modal';

const styleSheet = (/* theme */) => ({
	buttonFb: {
		color: '#4367c4',
		border: 'none',
		cursor: 'pointer',
		position: 'relative',
		boxSizing: 'border-box',
		whiteSpace: 'nowrap',
		'& svg': {
			verticalAlign: 'middle',
			width: '30px',
			height: '30px',
		},
	},
});

function mapStateToProps(/* state */) {
	return {
		store: {
			// auth: state.get('auth').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			loginFacebook,
			toggleLoginModal,
			toggleSignUpModal,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
@injectIntl
export default class FbBtnLogin extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		isLoginPage: PropTypes.bool,
		action: PropTypes.shape({
			loginFacebook: PropTypes.func.isRequired,
			toggleLoginModal: PropTypes.func.isRequired,
			toggleSignUpModal: PropTypes.func.isRequired,
		}).isRequired,
		intl: intlShape.isRequired,
	}

	static defaultProps = {
		isLoginPage: false,
	}

	handleLoginFbStart = () => {
		// console.log('sss');
	}

	handleResponseFacebook = (resultUser) => {
		const { formatMessage } = this.props.intl;
		const { accessToken } = resultUser;

		if (resultUser.status === 'not_authorized' || resultUser.status === 'unknown') {
			return;
		}

		if (accessToken) {
			this.props.action.loginFacebook({ accessToken }, () => {
				if (AuthStorage.loggedIn) {
					if (this.props.isLoginPage) {
						Router.push('/');
					} else {
						this.props.action.toggleLoginModal({ open: false });
						this.props.action.toggleSignUpModal({ open: false });
					}
				}
			});
		} else {
			notification.error({
				message: formatMessage({ id: 'error' }),
				description: formatMessage({ id: 'not.access_token_not_found' }),
			});
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<FacebookLogin
				appId="1984101708520688"
				fields="email"
				onClick={this.handleLoginFbStart}
				callback={this.handleResponseFacebook}
				icon={<FacebookIcon />}
				textButton=""
				cssClass={classes.buttonFb}
			/>
		);
	}
}
