/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-04-15 17:17:46
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import withRoot from 'src/root';

import { Form, Icon, Input, Button, Spin } from 'antd';

import Router from 'next/router';

import AuthStorage from 'src/utils/AuthStorage';

import MainLayout from 'src/layout/Main';

import { loginZalo } from 'src/redux/actions/auth';

@withRoot
@Form.create()
export default class ZaloLogin extends PureComponent {
	static propTypes = {
		form: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	static defaultProps = {
		// isSingUpPage: false,
	}

	state = {
		add: false,
		loading: false,
	}

	componentDidMount() {
		if (AuthStorage.loggedIn) {
			Router.push('/');
		}
		if (this.props.url.query.code) {  // eslint-disable-line
			this.props.dispatch(loginZalo({ accessToken: this.props.url.query.code }, (res) => {
				this.setState({
					add: res.code === 'additionalEmail',
				});
				if (AuthStorage.loggedIn) {
					Router.push('/');
				}
			}));  // eslint-disable-line
		} else {
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
				const { email, username } = values;

				this.props.dispatch(loginZalo({ accessToken: this.props.url.query.code, email, username }, () => {
					if (AuthStorage.loggedIn) {
						Router.push('/');
					}
				}, () => {
					this.setState({
						loading: false,
					});
				}));
			}
		});
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;

		return (
			<MainLayout>
				<Head>
					<title>Chove.vn - Đăng nhập Zalo</title>
				</Head>
				{
					this.state.add ?
						<div
							style={{
								padding: '25px 0',
								textAlign: 'center',
							}}
						>
							<Form
								onSubmit={this.handleSubmit}
								style={{
									padding: '25px 20px',
									width: 400,
									borderRadius: 4,
									position: 'relative',
									display: 'inline-block',
									background: '#fff',
									textAlign: 'left',
								}}
							>
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
										<Input size="large" className="radius-large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên đăng nhập" />,
									)}
								</Form.Item>
								<Button type="primary" className="radius-large" htmlType="submit" size="large" style={{ width: '100%', marginTop: 20 }} loading={this.state.loading}>
									Đăng nhập
								</Button>
							</Form>
						</div> :
						<div
							style={{
								padding: '30% 0 0',
								textAlign: 'center',
							}}
						>
							<Spin size="large" />
						</div>
				}
			</MainLayout>
		);
	}
}
