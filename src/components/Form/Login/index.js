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

import { Form, Icon, Input, Button, Popover } from 'antd';

import BtnFbLogin from 'src/components/Form/BtnFbLogin';
import BtnGgLogin from 'src/components/Form/BtnGgLogin';
import BtnZaloLogin from 'src/components/Form/BtnZaloLogin';

import { validEmail } from 'src/utils';

import AuthStorage from 'src/utils/AuthStorage';

import withStyles from 'src/theme/jss/withStyles';

import { loginRequest, checkUserExist } from 'src/redux/actions/auth';
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
	formWrapper: {
		overflow: 'hidden',
		position: 'relative',
		padding: '2px',
	},
	nextPage: {
		position: 'absolute',
		zIndex: 9,
		padding: '2px',
		top: '0',
		right: -1000,
		background: '#fff',
		width: '100%',
		transition: 'all .3s ease',
	},
	open: {
		right: 0,
	},
	signUpNote: {
		'& .ant-popover-inner-content': {
			background: '#F5F5F5',
			paddingTop: 25,
			borderRadius: 5,
		},
		'& .ant-popover-arrow': {
			background: '#F5F5F5',
		}
	}
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
			loginRequest,
			checkUserExist,
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
			checkUserExist: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		isLoginPage: false,
		style: {},
	}

	state = {
		loading: false,
		nextPage: false,
		error: '',
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
					error: '',
				});
				const { email, password } = values;

				if (!this.state.nextPage) {
					this.props.action.checkUserExist(email, (res) => {
						this.setState({
							nextPage: res.count > 0,
							loading: false,
						});
						if (res.count === 0) {
							// ko có
							this.setState({
								error: 'Tài khoản không tồn tại',
							});
						}
					});
				} else {
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

	hide = () => {
		this.setState({
			visible: false,
		});
	}
	handleVisibleChange = (visible) => {
		this.setState({ visible });
	}

	render() {
		const { form: { getFieldDecorator }, classes, style } = this.props;

		return (
			<div className={classes.root} style={style}>
				<div className={classes.logo}>
					<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<div className={classes.formWrapper}>
						<Form.Item label="Tên đăng nhập hoặc email" style={{ marginBottom: 0 }}>
							{getFieldDecorator('email', {
								rules: [{ required: true, message: 'Làm ơn nhập tài khoản hoặc email của bạn!' }],
							})(
								<Input autoFocus className="radius-large" size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên đăng nhập hoặc email" />,
							)}
						</Form.Item>
						<Form.Item label="Mật khẩu" className={classes.nextPage + ' ' + (this.state.nextPage ? classes.open : '')}>
							{
								this.state.nextPage && getFieldDecorator('password', {
									rules: [{ required: true, message: 'Làm ơn nhập mật khẩu!' }, { min: 5 }],
								})(
									<Input autoFocus size="large" className="radius-large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu" />,
								)
							}
						</Form.Item>
					</div>
					{
						this.state.error &&
						<div className="ant-form-item-control has-error">
							<div className="ant-form-explain">{this.state.error}</div>
						</div>
					}
					<Button type="primary" htmlType="submit" size="large" className="radius-large" style={{ width: '100%', marginTop: 20 }} loading={this.state.loading}>
						Đăng nhập
					</Button>
					<Form.Item>
						<div className={classes.buttonLogin}>
							<div>
								<a href="/sign-up" onClick={this.handleOpenSignUpDialog}>Đăng ký</a>
								<Popover
									content={
										<div style={{ width: 400, color: '#000', fontSize: 14, position: 'relative' }}>
											<Icon type="close-circle" style={{ position: 'absolute', top: 0, right: 0, fontSize: 22, color: '#E0E0E0' }} onClick={this.hide} />
											<div style={{ fontWeight: 500 }}>Lợi ích khi là thành viên của Chove.vn</div>
											<ol style={{ paddingLeft: 15, marginTop: 10, fontStyle: 'italic' }}>
												<li>Thành viên tham gia nhóm phải kết bạn với face này để nhận được thông báo trên facebook.</li>
												<li>Khi có thông báo yêu cầu học viên đổi Avatar của mình theo Avatar của chương trình, yêu cầu các học viên thực hiện đúng quy định.</li>
												<li>Thành viên không được đăng link quảng cáo, các link giới thiệu về chương trình, sản phẩm khác, không đăng video, hình ảnh đồi trụy, vi phạm thuần phong mỹ tục của người Việt Nam và các thông tin về hoạt động của đội/nhóm khác trong group.</li>
												<li>Thành viên giao tiếp trên Group lịch sự, có văn hóa, tôn trọng nhau, không nói tục, chửi bậy.</li>
												<li>Thành viên đăng bài và bình luận phải viết Tiếng Việt có dấu, không bàn luận các vấn đề liên quan đến chính trị, đảng và nhà nước.</li>
												<li>Thành viên Lưu Ý: Có những phần mềm hỗ trợ facebook là những phần mềm tự động đăng bài khi đăng nhập face của mình, Thành viên gỡ bỏ các phần mềm này ra để tránh vi phạm nội quy.</li>
												<li>Thành viên tạo thói quen vào nhóm này hàng ngày để xem thông báo và giao lưu cùng nhau.</li>
											</ol>
										</div>
									}
									placement="bottom"
									trigger="click"
									visible={this.state.visible}
									onVisibleChange={this.handleVisibleChange}
									overlayClassName={classes.signUpNote}
								>
									<Icon type="question-circle" style={{ marginLeft: 5, color: '#4368C4' }} />
								</Popover>
							</div>
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
						<BtnZaloLogin />
					</div>
				</Form>
			</div>
		);
	}
}
