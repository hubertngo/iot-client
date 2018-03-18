/* --------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 * Created: 2017-08-09 23:58:09
 *
 * LastModified: 2018-01-12 15:42:29
 *------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { bindActionCreators } from 'redux';

import { notification } from 'antd';

import Router from 'next/router';

import withStyles from 'src/theme/jss/withStyles';

import AuthStorage from 'src/utils/AuthStorage';

import { loginGoogle } from 'src/redux/actions/auth';
import { toggleSignUpModal, toggleLoginModal } from 'src/redux/actions/modal';

const styleSheet = (/* theme */) => ({
	buttonGG: {
		border: 'none',
		cursor: 'pointer',
		position: 'relative',
		boxSizing: 'border-box',
		whiteSpace: 'nowrap',
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
			loginGoogle,
			toggleLoginModal,
			toggleSignUpModal,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
export default class GgBtnLogin extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		isLoginPage: PropTypes.bool,
		// action
		action: PropTypes.shape({
			loginGoogle: PropTypes.func.isRequired,
			toggleLoginModal: PropTypes.func.isRequired,
			toggleSignUpModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		isLoginPage: false,
	}

	handleResponseGoogle = (result) => {
		if (result.error === 'popup_closed_by_user') {
			return;
		}
		const { tokenId: accessToken } = result;

		if (!result.error && accessToken) {
			this.props.action.loginGoogle({ accessToken }, () => {
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
			if (result.error !== 'idpiframe_initialization_failed') {
				notification.error({
					message: 'Error message',
					description: result.error,
				});
			}
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<GoogleLogin
				clientId="671782562952-rhmgci05iqn7bfg7l380c24ftb2kq5r5.apps.googleusercontent.com"
				onSuccess={this.handleResponseGoogle}
				onFailure={this.handleResponseGoogle}
				className={classes.buttonGG}
			>
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMESURBVHgBrZZNTBNREMfnve0aviqtEfzAhAKJIZBIFYzEeFhsSIgxUk1I5GQbw1WQu6ZNvBsOXoWejVKIJkah1OiBEA7FGG/ajYoaFSg0aO2yb5wuFGm7bfn6JZt2Z/bN/71582aXQRGWlHZFkvAGAioAaANgNsPBIMIQVAQIVk7OBArFYPkccde5fgHCtxm0MCpHGLGGZvzbElnqcjokTR5GYArsnKiQkxftzyPqVqMlW4BrB6YoBQ7YBTQuAglbLNvOsgVglwICwW8PzfjMfJsr4ZrsyydAmx5GhAAIKbxu0W0gCXpWcnPEKwKkQXtoegTyYKxkpafJg4sVw7nRMSY4XrVPzIZhDxgiyQmIrr2ucWhvajIFhHTaHp5WYY/w5AtwUr075AvzILs+/VdnbGA/BAwRyrU7fSOf/Q4l3nd0MhLqwSIHbCdYOIOWDNUjv+FA39sheGw+wH3/j4Mhm4LtghC10K44su2SRPVeGAdsF4aVHBnktA1KYQz2DWbjzCQgt0At7COccqZmG7Uk1BUZh3kuMyJcMJjballGC/SJtu7W8cumI4K3S1X8i/U5VxIbKCtj2c/TUYgw7SUo9N+oli9YCje1NvhKv9SLrh2vOD8a7vBBMTzUs2OxRD1V3YcsF20v9xgnnoSmJvVq5Y7eDHGU0/mIMY2f4TZr9H3Ho7wCPQ9+UHqtdSQQgtyqi44OltQbDdK71uaf1Q8pGcsEqjqLCInVZX/Ts0sBKCtHqAKo/tls+OPxWdD1E2xlXlXK8NRDEwEkAhux1ml82kkzYR1gCobJF9AZzklJyahGYRFOOsi3ZK1aqf18D+S1o9mDPtIqGjJFRrscqZmTpVhl5SCJcjj2rR+sq+3pSS0ih9bgQKmaIbJXoRSHF3qhauE6Ceiu4EDFZtfIecenhFDWnzBgTijwoWECpvqU7Veva9rrVbc68gZpHO/0UJHf3ehthcSoM2EMkQ0l9OSQ6g7nf8fn4+S4y81B6kaOLZwqCNOfSKlOwaggBLxKCG3MLHiaf3hyQhb+E869AAAAAElFTkSuQmCC" alt="gg-logo" />
			</GoogleLogin>
		);
	}
}
