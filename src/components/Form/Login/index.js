/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 15:52:03
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Router from 'next/router';
import Link from 'next/link';

import { Form, Icon, Input, Button } from 'antd';

import BtnFbLogin from 'src/components/Form/BtnFbLogin';
import BtnGgLogin from 'src/components/Form/BtnGgLogin';

import AuthStorage from 'src/utils/AuthStorage';

import withStyles from 'src/theme/jss/withStyles';

import { validEmail } from 'src/utils';

import { loginRequest } from 'src/redux/actions/auth';
import { toggleSignUpModal, toggleLoginModal } from 'src/redux/actions/modal';

const styleSheet = (theme) => ({
	root: {
		padding: '30px',
		width: 400,
		position: 'relative',
		display: 'inline-block',
		background: '#fff',
		textAlign: 'left',
		borderRadius: theme.radius.default,
	},
	form: {
		padding: '0 30px',
	},
	logo: {
		marginBottom: '50px',
	},
	buttonLogin: {
		marginBottom: 30,
		marginTop: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	dividend: {
		textAlign: 'center',
		color: '#bdbdbd',
		fontStyle: 'initial',
		position: 'relative',
		marginBottom: 20,
		textTransform: 'uppercase',
		'&:before': {
			content: '""',
			background: 'rgb(224, 224, 224)',
			width: '100%',
			height: 1,
			position: 'absolute',
			right: 0,
			left: 0,
			top: '50%',
		},
		'& span': {
			background: '#fff',
			display: 'inline-block',
			position: 'relative',

			zIndex: '1',
			padding: '0 10px',
		},
	},
	signUp: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.auth,
			modal: state.modal,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			loginRequest,
			toggleSignUpModal,
			toggleLoginModal,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class LoginForm extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		style: PropTypes.object,
		isLoginPage: PropTypes.bool,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			loginRequest: PropTypes.func.isRequired,
			toggleLoginModal: PropTypes.func.isRequired,
			toggleSignUpModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		isLoginPage: false,
		style: {},
	}

	state = {
		loading: false,
	}

	componentDidMount() {
		if (AuthStorage.loggedIn) {
			Router.push('/');
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true,
				});
				const { email, password } = values;

				const auth = { password };

				if (validEmail(email)) {
					auth.email = email;
				} else {
					auth.username = email;
				}

				this.props.action.loginRequest(auth, () => {
					if (AuthStorage.loggedIn && this.props.store.auth.id) {
						if (this.props.isLoginPage) {
							Router.push('/');
						} else {
							this.props.action.toggleLoginModal({ open: false });
						}
					}
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}

	handleOpenSignUpDialog = (e) => {
		e.preventDefault();
		this.props.action.toggleLoginModal({ open: false });
		setTimeout(() => {
			this.props.action.toggleSignUpModal({ open: true, closable: this.props.store.modal.login.closable });
		}, 100);
	}

	render() {
		const { form: { getFieldDecorator }, classes, style } = this.props;

		return (
			<div className={classes.root} style={style}>
				<div className={classes.logo}>
					<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<Form.Item label="Tên đăng nhập hoặc email" style={{ marginBottom: 0 }}>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Làm ơn nhập tài khoản hoặc email của bạn!' }],
						})(
							<Input className="radius-large" size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên đăng nhập hoặc email" />,
						)}
					</Form.Item>
					<Form.Item label="Mật khẩu">
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Làm ơn nhập mật khẩu!' }, { min: 5 }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu" />,
						)}
					</Form.Item>
					<Button type="primary" htmlType="submit" size="large" className="radius-large" style={{ width: '100%' }} loading={this.state.loading}>
						Đăng nhập
					</Button>
					<Form.Item>
						<div className={classes.buttonLogin}>
							<a href="/sign-up" onClick={this.handleOpenSignUpDialog}>Đăng ký</a>
							<Link href="/forgot-password">
								<a className="login-form-forgot">Quên mật khẩu?</a>
							</Link>
						</div>
					</Form.Item>
					<div className={classes.dividend}>
						<span>Hoặc đăng nhập qua</span>
					</div>

					<div className="text-center">
						<BtnFbLogin />
						<BtnGgLogin />
					</div>
				</Form>
			</div>
		);
	}
}
