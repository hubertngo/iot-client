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

import { resetPassword, logoutRequest } from 'src/redux/actions/auth';

import AuthStorage from 'src/utils/AuthStorage';

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
			resetPassword,
			logoutRequest,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
@Form.create()
@injectIntl
export default class SetPassword extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		token: PropTypes.string.isRequired,
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			resetPassword: PropTypes.func.isRequired,
			logoutRequest: PropTypes.func.isRequired,
		}).isRequired,
		intl: intlShape.isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
	}

	componentDidMount() {
		if (AuthStorage.loggedIn) {
			this.props.action.logoutRequest();
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true,
				});
				this.props.action.resetPassword({ token: this.props.token, password: values.password }, () => {
					Router.pushRoute('/login');
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}

	handleConfirmBlur = (e) => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

	render() {
		const { form: { getFieldDecorator }, token, classes, intl: { formatMessage } } = this.props;
		if (!token) {
			return <div>Token is invalid</div>;
		}

		return (
			<div className={classes.root}>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<div className={classes.logo}>
						<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
					</div>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: formatMessage({ id: 'new_password_required' }) }, { min: 6, message: formatMessage({ id: 'password_format' }) }, { validator: this.checkConfirm }],
						})(
							<Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={formatMessage({ id: 'new_password' })} />,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('passwordConfirm', {
							rules: [{ required: true, message: formatMessage({ id: 'confirm_password_required' }) }, { min: 6, message: formatMessage({ id: 'password_format' }) }, { validator: this.checkPassword }],
						})(
							<Input size="large" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={formatMessage({ id: 'confirm_new_password' })} />,
						)}
					</Form.Item>
					<Form.Item>
						<Button size="large" type="primary" htmlType="submit" className={classes.btn} loading={this.state.loading}>
							{formatMessage({ id: 'reset_password' })}
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
