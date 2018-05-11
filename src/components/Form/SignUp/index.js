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
import { injectIntl, intlShape } from 'react-intl';

import { Router } from 'src/routes';

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

		'@media (max-width: 991.98px)': {
			width: '100%',
			minHeight: 'calc(100vh - 65px)',
			padding: 10,
			paddingTop: 75,
			display: 'block',
		},
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
@injectIntl
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
		intl: PropTypes.shape({
			formatMessage: PropTypes.func,
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
			Router.pushRoute('/');
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
		const { form, intl: { formatMessage } } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback(formatMessage({ id: 'error_check_confirm_password' }));
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
		const { form: { getFieldDecorator }, classes, intl: { formatMessage } } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.logo + ' hidden-md-down'}>
					<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<Form.Item label={formatMessage({ id: 'fullname' })} style={{ marginBottom: 0 }}>
						{getFieldDecorator('fullName', {
							rules: [{ required: true, message: formatMessage({ id: 'form.fullname_required' }) }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={formatMessage({ id: 'fullname' })} />,
						)}
					</Form.Item>
					<Form.Item label="Email" style={{ marginBottom: 0 }}>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: formatMessage({ id: 'email_required' }) }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: formatMessage({ id: 'email_format' }) }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
						)}
					</Form.Item>
					<Form.Item label={formatMessage({ id: 'username' })} style={{ marginBottom: 0 }}>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: formatMessage({ id: 'username_required' }) }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={formatMessage({ id: 'username' })} />,
						)}
					</Form.Item>
					<Form.Item label={formatMessage({ id: 'password' })} style={{ marginBottom: 0 }}>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: formatMessage({ id: 'password_required' }) }, { min: 6, message: formatMessage({ id: 'password_format' }) }, { validator: this.checkConfirm }],
						})(
							<Input size="large" className="radius-large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={formatMessage({ id: 'password' })} />,
						)}
					</Form.Item>
					<Form.Item label={formatMessage({ id: 'confirm_password' })}>
						{getFieldDecorator('passwordConfirm', {
							rules: [{ required: true, message: formatMessage({ id: 'form_error.confirm-password_required' }) }, { min: 6, message: formatMessage({ id: 'password_format' }) }, { validator: this.checkPassword }],
						})(
							<Input size="large" className="radius-large" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={formatMessage({ id: 'confirm_password' })} />,
						)}
					</Form.Item>
					<Button type="primary" className="radius-large" htmlType="submit" size="large" style={{ width: '100%' }} loading={this.state.loading}>
						{formatMessage({ id: 'sign_up' })}
					</Button>
					<div className={classes.signUp}>
						{formatMessage({ id: 'have_account' })}
						{' '}
						<a href="/login" onClick={this.handleOpenLoginDialog}>{formatMessage({ id: 'login' })}</a>
					</div>
				</Form>
			</div>
		);
	}
}
