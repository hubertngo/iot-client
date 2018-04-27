/* --------------------------------------------------------
* Author Lê Quang Thịnh
* Email lqthinh93@gmail.com
* Phone 0937341717
*
* Created: 2018-03-28 10:00:30
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Icon, Row, Col, Button, Input, Radio, Upload } from 'antd';

import withStyles from 'src/theme/jss/withStyles';

import { toggleEditUserInfoModal } from 'src/redux/actions/modal';
import { editProfile } from 'src/redux/actions/auth';
import { uploadFiles } from 'src/redux/actions/upload';
import moment from 'moment';
import DatePicker from 'src/components/DatePickerLunar';

const styleSheet = (/* theme */) => ({
	root: {
		width: 500,
		position: 'relative',
		textAlign: 'left',
		padding: 20,

		'& .ant-upload.ant-upload-select-picture-card': {
			width: 70,
			height: 70,
			borderRadius: '50%',
			borderStyle: 'solid',
		},
	},
	header: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginBottom: 20,
	},
	closeBtn: {
		position: 'absolute',
		right: 10,
		top: 10,
		fontSize: '20px',
		cursor: 'pointer',
	},
	action: {
		textAlign: 'right',
		marginTop: 20,
	},
	actionGroup: {
		marginBottom: 15,
	},
	avatar: {
		width: 70,
		height: 70,
		borderRadius: '50%',
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
			modal: state.get('modal').toJS(),
			// userView: state.getIn(['user', 'view']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleEditUserInfoModal,
			editProfile,
			uploadFiles,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class EditUserInfoForm extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		style: PropTypes.object,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
			modal: PropTypes.object,
			userView: PropTypes.object,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleEditUserInfoModal: PropTypes.func,
			editProfile: PropTypes.func,
			uploadFiles: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
		style: {},
	}

	state = {
		imageUrl: this.props.store.auth.avatar || '',
		imageFile: null,
	}

	handleChangeAvatar = (info) => {
		/* eslint-disable no-undef */
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			this.setState({
				imageUrl: reader.result,
				imageFile: info.file.originFileObj,
			});
		});
		reader.readAsDataURL(info.file.originFileObj);
	}

	checkBirthday = (rule, value, callback) => {
		if (moment().diff(value, 'years') < 10 || moment().isBefore(value)) {
			callback('Vui lòng nhập đúng năm sinh');
		} else {
			callback();
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				const userData = { ...values, id: this.props.store.auth.id };

				this.setState({ loading: true });

				if (this.state.imageFile) {
					this.props.action.uploadFiles({ files: [{ status: 'error', originFileObj: this.state.imageFile }] }, (avatars = []) => {
						userData.avatar = avatars[0] ? avatars[0] + '?' + (+new Date()) : '';

						this.props.action.editProfile(userData, () => {
							this.setState({ loading: false });

							this.props.action.toggleEditUserInfoModal({ open: false });
						});
					});
				} else {
					this.props.action.editProfile(userData, () => {
						this.setState({ loading: false });

						this.props.action.toggleEditUserInfoModal({ open: false });
					});
				}
			}
		});
	}

	render() {
		const { form: { getFieldDecorator }, classes, style, store: { auth }, action } = this.props;

		return (
			<div className={classes.root} style={style}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={() => action.toggleEditUserInfoModal({ open: false })} />
				<div className={classes.header}>
					Chỉnh sửa thông tin cá nhân
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<Row className={classes.formItem} type="flex">
						<Upload
							name="avatar"
							listType="picture-card"
							showUploadList={false}
							// action="//jsonplaceholder.typicode.com/posts/"
							onChange={this.handleChangeAvatar}
						>
							{this.state.imageUrl ? <img src={this.state.imageUrl} alt="" className={classes.avatar} /> : <Icon type="plus" style={{ color: '#BACAD6', fontSize: 20 }} />}
						</Upload>
						<span style={{ padding: '25px 0 0 20px' }}>
							Chọn ảnh đại diện
						</span>
					</Row>
					<Form.Item style={{ marginBottom: 0 }}>
						<div className={classes.formItem}>
							<div className={classes.formLabel}> Tên hiển thị </div>
							{getFieldDecorator('fullName', {
								initialValue: auth.fullName,
								rules: [{ required: true, message: 'Làm ơn nhập tên của bạn!' }],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Họ và Tên" />,
							)}
						</div>
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						<div className={classes.formItem}>
							<div className={classes.formLabel}> Ngày tháng năm sinh </div>
							{getFieldDecorator('birthday', {
								initialValue: auth.birthday ? moment(auth.birthday) : '',
								rules: [
									{ required: true, message: 'Làm ơn nhập ngày sinh của bạn!' },
									{ validator: this.checkBirthday },
								],
							})(
								<DatePicker placeholder="dd/mm/yyyy" />,
							)}
						</div>
					</Form.Item>
					<Form.Item>
						<Row className={classes.formItem} type="flex">
							<Col span={6} className={classes.formLabel}> Giới tính </Col>
							<Col span={18}>
								{getFieldDecorator('gender', {
									initialValue: auth.gender,
								})(
									<Radio.Group>
										<Radio value="male"> Nam </Radio>
										<Radio value="female"> Nữ </Radio>
									</Radio.Group>,
								)}
							</Col>
						</Row>
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						<div className={classes.formItem}>
							<div className={classes.formLabel}> Email </div>
							{getFieldDecorator('email', {
								initialValue: auth.email,
								rules: [{ required: true, message: 'Làm ơn nhập email của bạn!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email không hợp lệ!' }],
							})(
								<Input />,
							)}
						</div>
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						<div className={classes.formItem}>
							<div className={classes.formLabel}> Số điện thoại </div>
							{getFieldDecorator('phone', {
								initialValue: auth.phone,
								rules: [{ required: true, message: 'Làm ơn nhập số điện thoại của bạn!' }],
							})(
								<Input />,
							)}
						</div>
					</Form.Item>
					<div className={classes.action}>
						<div className={classes.actionGroup}>
							<Button type="primary" htmlType="submit" loading={this.state.loading}> Lưu </Button>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}
