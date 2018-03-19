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

import { forgotPassword, logoutRequest } from 'src/redux/actions/auth';

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

function mapStateToProps(/* state */) {
	return {
		// store: {
		// 	auth: state.get('auth').toJS(),
		// },
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			forgotPassword,
			logoutRequest,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
@Form.create()
export default class ForgotPassword extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			forgotPassword: PropTypes.func.isRequired,
			logoutRequest: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
		sent: false,
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
				this.props.action.forgotPassword(values, () => {
					this.setState({
						loading: false,
						sent: true,
					});
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}
	render() {
		const { form: { getFieldDecorator }, classes } = this.props;

		if (this.state.sent) {
			return (
				<div className={classes.root}>
					<div className={classes.form}>
						<p>Làm ơn kiểm tra email của bạn để đặt lại mật khẩu.</p>
						<Button size="large" type="primary" className={classes.btn} onClick={() => Router.push('/login')}>
							Đăng nhập
						</Button>
					</div>
				</div>
			);
		}

		return (
			<div className={classes.root}>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<div className={classes.logo}>
						<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
					</div>

					<p>
						Nhập email đã đăng ký của bạn. <br />
						Chúng tôi sẽ gửi một email cho bạn để đặt lại mật khẩu.
					</p>
					<Form.Item>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Làm ơn nhập email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email không hợp lệ!' }],
						})(
							<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" size="large" htmlType="submit" className={classes.btn} loading={this.state.loading}>
							Đặt lại mật khẩu
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
