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

import { Form, Icon, Input, Button } from 'antd';

import AuthStorage from 'src/utils/AuthStorage';

import withStyles from 'src/theme/jss/withStyles';

import { signUpRequest } from 'src/redux/actions/auth';
import { toggleSignUpModal, toggleLoginModal } from 'src/redux/actions/modal';

const styleSheet = (theme) => ({
	root: {
		padding: '25px 20px',
		width: 400,
		borderRadius: theme.radius.default,
		position: 'relative',
		display: 'inline-block',
		background: '#fff',
		textAlign: 'left',
	},
	form: {
		padding: '0 30px',
	},
	logo: {
		marginBottom: '30px',
	},
	buttonLogin: {
		marginBottom: 50,
		marginTop: 20,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	signUp: {
		marginTop: 15,
		textAlign: 'center',
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
			modal: state.get('modal').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			signUpRequest,
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
		isSingUpPage: PropTypes.bool,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			signUpRequest: PropTypes.func.isRequired,
			toggleSignUpModal: PropTypes.func.isRequired,
			toggleLoginModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		isSingUpPage: false,
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
				const { fullName, email, username, password } = values;

				this.props.action.signUpRequest({ fullName, email, password, username }, () => {
					if (AuthStorage.loggedIn && this.props.store.auth.id) {
						if (this.props.isSingUpPage) {
							Router.push('/');
						} else {
							this.props.action.toggleSignUpModal({ open: false });
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

	handleOpenLoginDialog = (e) => {
		e.preventDefault();
		this.props.action.toggleSignUpModal({ open: false });
		setTimeout(() => {
			this.props.action.toggleLoginModal({ open: true, closable: this.props.store.modal.signUp.closable });
		}, 100);
	}

	checkPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}

	checkConfirm = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['passwordConfirm'], { force: true });
		}
		callback();
	}

	handleConfirmBlur = (e) => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	render() {
		const { form: { getFieldDecorator }, classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.logo}>
					<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<Form.Item label="Họ và tên" style={{ marginBottom: 0 }}>
						{getFieldDecorator('fullName', {
							rules: [{ required: true, message: 'Làm ơn nhập tên của bạn!' }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Họ và Tên" />,
						)}
					</Form.Item>
					<Form.Item label="Email" style={{ marginBottom: 0 }}>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Làm ơn nhập email của bạn!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email không hợp lệ!' }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
						)}
					</Form.Item>
					<Form.Item label="Tên đăng nhập" style={{ marginBottom: 0 }}>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: 'Làm ơn nhập tên tài khoản của bạn!' }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
						)}
					</Form.Item>
					<Form.Item label="Mật khẩu" style={{ marginBottom: 0 }}>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Làm ơn nhập mật khẩu của bạn!' }, { min: 6, message: 'Mật khẩu không được ngắn hơn 6 ký tự.' }, { validator: this.checkConfirm }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu" />,
						)}
					</Form.Item>
					<Form.Item label="Xác nhận mật khẩu">
						{getFieldDecorator('passwordConfirm', {
							rules: [{ required: true, message: 'Làm ơn nhập mật khẩu xác nhận!' }, { min: 6, message: 'Mật khẩu không được ngắn hơn 6 ký tự.' }, { validator: this.checkPassword }],
						})(
							<Input size="large" className="radius-large" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Xác nhận mật khẩu" />,
						)}
					</Form.Item>
					<Button type="primary" className="radius-large" htmlType="submit" size="large" style={{ width: '100%' }} loading={this.state.loading}>
						Đăng Ký
					</Button>
					<div className={classes.signUp}>
						Bạn đã có tài khoản?
						{' '}
						<a href="/login" onClick={this.handleOpenLoginDialog}>Đăng nhập</a>
					</div>
				</Form>
			</div>
		);
	}
}
