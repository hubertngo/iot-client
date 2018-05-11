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

import { Router } from 'src/routes';
import { Form, Icon, Input, Button, notification } from 'antd';

import { changePassword, logoutRequest } from 'src/redux/actions/auth';

import withStyles from 'src/theme/jss/withStyles';

const styleSheet = (theme) => ({
	root: {
		padding: '25px 20px',
		width: '95%',
		[theme.breakpoints.up.sm]: {
			padding: '25px 40px',
			width: '400px',
		},
		position: 'relative',
		display: 'inline-block',
		background: '#fff',
		textAlign: 'left',
	},
	btn: {
		width: '100%',
	},
	logo: {
		textAlign: 'center',
		marginBottom: '20px',
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
			changePassword,
			logoutRequest,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
@Form.create()
export default class ChangePass extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			changePassword: PropTypes.func.isRequired,
			logoutRequest: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
		confirmDirty: false,
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true,
				});
				this.props.action.changePassword(values, () => {
					notification.success({
						message: 'Congratulation',
						description: 'Your password has been changed successfully! Thank you.',
					});
					this.props.action.logoutRequest(() => {
						Router.pushRoute('/login');
					});
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}

	checkPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('newPassword')) {
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
		const { form: { getFieldDecorator }, classes, store: { auth = {} } } = this.props;

		if (auth.loginType !== 'email') {
			return (
				<div
					style={{
						fontSize: '24px',
						textAlign: 'center',
						marginTop: '50px',
					}}
				>
					Tài khoản bạn không thể thay đổi mật khẩu.
				</div>
			);
		}

		return (
			<div className={classes.root}>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<div className={classes.logo}>
						<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
					</div>
					<Form.Item>
						{getFieldDecorator('oldPassword', {
							rules: [{ required: true, message: 'Làm ơn nhập mật khẩu cũ!' }, { min: 6, message: 'Mật khẩu không được ngắn hơn 6 ký tự.' }],
						})(
							<Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu cũ" />,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('newPassword', {
							rules: [{ required: true, message: 'Làm ơn nhập mật khẩu mới!' }, { min: 6, message: 'Mật khẩu không được ngắn hơn 6 ký tự.' }, { validator: this.checkConfirm }],
						})(
							<Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu mới" />,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('passwordConfirm', {
							rules: [{ required: true, message: 'Làm ơn xác nhận mật khẩu!' }, { min: 6, message: 'Mật khẩu không được ngắn hơn 6 ký tự.' }, { validator: this.checkPassword }],
						})(
							<Input size="large" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Xác nhận mật khẩu" />,
						)}
					</Form.Item>
					<Form.Item>
						<Button size="large" type="primary" htmlType="submit" className={classes.btn} loading={this.state.loading}>
							Đổi mật khẩu
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
