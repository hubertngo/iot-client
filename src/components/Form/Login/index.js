/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 15:52:03
*------------------------------------------------------- */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { Router } from 'src/routes';
import Link from 'next/link';

import { Form, Icon, Input, Button } from 'antd';

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
		overflow: 'hidden',

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
		marginBottom: '50px',

		'@media (max-width: 991.98px)': {
			display: 'none',
		},
	},
	buttonLogin: {
		// marginBottom: 30,
		marginTop: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'@media (max-width: 991.98px)': {
			marginBottom: 0,
		},
	},
	dividend: {
		textAlign: 'center',
		color: '#bdbdbd',
		fontStyle: 'initial',
		position: 'relative',
		marginTop: 70,
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

			'@media (max-width: 991.98px)': {
				left: '25% !important',
			},
		},

		'@media (max-width: 991.98px)': {
			left: '10px !important',
		},
	},
	noteWrapper: {
		color: '#000',
		position: 'relative',
		fontStyle: 'italic',
		fontSize: 13,
		maxHeight: 0,
		height: 'auto',
		overflow: 'hidden',
		marginLeft: -30,
		marginRight: -30,
		marginTop: -20,
		background: '#F6F7F9',

		'&:before': {
			content: '""',
			display: 'block',
			width: 0,
			height: 0,
			borderLeft: '10px solid transparent',
			borderRight: '10px solid transparent',
			borderBottom: '10px solid #F6F7F9',
			position: 'absolute',
			top: -10,
			left: 83,
		},

		'@media (max-width: 991.98px)': {
			// textAlign: 'center',
			marginTop: -25,
		},
	},
	noteWrapperActive: {
		maxHeight: 500,
	},
	noteTitle: {
		marginBottom: 10,
		fontWeight: 500,
		fontSize: 14,
		padding: '20px 20px 0 20px',
	},
	noteContent: {
		padding: '0 20px 20px 20px',
	},
	noteCancel: {
		position: 'absolute',
		top: 10,
		right: 10,
		color: '#DCE1E7',
		fontSize: 22,
	},
	mobileLink: {
		'@media (max-width: 991.98px)': {
			fontStyle: 'italic',
			color: '#7D8DAD',
		},
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
@injectIntl
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
		intl: intlShape.isRequired,
	}

	static defaultProps = {
		isLoginPage: false,
		style: {},
	}

	state = {
		loading: false,
		nextPage: false,
		error: '',
		activeNote: false,
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
								error: this.props.intl.formatMessage({ id: 'unexist_account' }),
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
								Router.pushRoute('/');
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

	toggleNote = () => {
		this.setState({ activeNote: !this.state.activeNote });
	}

	hideNote = () => {
		this.setState({ activeNote: false });
	}

	render() {
		const { form: { getFieldDecorator }, classes, style, isLoginPage, intl: { formatMessage } } = this.props;

		return (
			<div className={classes.root} style={style}>
				<div className={classes.logo}>
					<img src="/static/assets/images/logo/1x.png" alt="chove.vn" />
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<div className={classes.formWrapper}>
						<Form.Item label={formatMessage({ id: 'username_or_email' })} style={{ marginBottom: 0 }}>
							{getFieldDecorator('email', {
								rules: [{ required: true, message: formatMessage({ id: 'username_email_required' }) }],
							})(
								<Input autoFocus className="radius-large" size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={formatMessage({ id: 'username_or_email' })} />,
							)}
						</Form.Item>
						<Form.Item label="Mật khẩu" className={classes.nextPage + ' ' + (this.state.nextPage ? classes.open : '')}>
							{
								this.state.nextPage && getFieldDecorator('password', {
									rules: [{ required: true, message: formatMessage({ id: 'password_required' }) }, { min: 5 }],
								})(
									<Input autoFocus size="large" className="radius-large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={formatMessage({ id: 'password' })} />,
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
						{formatMessage({ id: 'login' })}
					</Button>
					<Form.Item>
						<div className={classes.buttonLogin}>
							<div>
								<a href="/sign-up" onClick={this.handleOpenSignUpDialog} className={classes.mobileLink}>{formatMessage({ id: 'sign_up' })}</a>
								{
									!isLoginPage && <Icon type="question-circle" style={{ marginLeft: 5, color: '#4368C4' }} className="hidden-md-down" onClick={this.toggleNote} />
								}
								<Icon type="question-circle" style={{ marginLeft: 5, color: '#7D8DAD' }} className="hidden-md-up" onClick={this.toggleNote} />
							</div>

							<Link href="/forgot-password">
								<a className={classes.mobileLink + ' login-form-forgot'}>{formatMessage({ id: 'forgot_password' })}?</a>
							</Link>
						</div>
					</Form.Item>
					<div className={classes.noteWrapper + ' ' + (this.state.activeNote ? classes.noteWrapperActive : '')} style={{ transition: 'max-height 500ms ease-in-out' }}>
						<Icon type="close-circle" className={classes.noteCancel} onClick={this.hideNote} />
						<div className={classes.noteTitle}>Lợi ích khi là thành viên của Chove.vn</div>
						<div className={classes.noteContent}>
							<div className={classes.noteRule}>1. Thành viên tham gia nhóm phải kết bạn với face này để nhận được thông báo trên facebook.</div>
							<div className={classes.noteRule}>2. Khi có thông báo yêu cầu học viên đổi Avatar của mình theo Avatar của chương trình, yêu cầu các học viên thực hiện đúng quy định.</div>
							<div className={classes.noteRule}>3. Thành viên không được đăng divnk quảng cáo, các divnk giới thiệu về chương trình, sản phẩm khác, không đăng video, hình ảnh đồi trụy, vi phạm thuần phong mỹ tục của người Việt Nam và các thông tin về hoạt động của đội/nhóm khác trong group.</div>
							<div className={classes.noteRule}>4. Thành viên giao tiếp trên Group lịch sự, có văn hóa, tôn trọng nhau, không nói tục, chửi bậy.</div>
							<div className={classes.noteRule}>5. Thành viên đăng bài và bình luận phải viết Tiếng Việt có dấu, không bàn luận các vấn đề divên quan đến chính trị, đảng và nhà nước.</div>
							<div className={classes.noteRule}>6. Thành viên Lưu Ý: Có những phần mềm hỗ trợ facebook là những phần mềm tự động đăng bài khi đăng nhập face của mình, Thành viên gỡ bỏ các phần mềm này ra để tránh vi phạm nội quy.</div>
							<div className={classes.noteRule}>7. Thành viên tạo thói quen vào nhóm này hàng ngày để xem thông báo và giao lưu cùng nhau.</div>
						</div>
					</div>
					{
						!this.state.activeNote && (
							<Fragment>
								<div className={classes.dividend}>
									<span>{formatMessage({ id: 'login_by' })}</span>
								</div>
								{
									this.state.visible && <div style={{ height: 400 }} className="hidden-sm-up" />
								}
								<div className="text-center">
									<BtnFbLogin />
									<BtnGgLogin />
									<BtnZaloLogin />
								</div>
							</Fragment>
						)
					}
				</Form>
			</div>
		);
	}
}
