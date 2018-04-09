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

import { Form, Icon, Row, Col, Button, Input, Radio, DatePicker } from 'antd';
import Avatar from 'src/components/Photo/Avatar';

import withStyles from 'src/theme/jss/withStyles';

import { toggleEditUserInfoModal } from 'src/redux/actions/modal';
import { updateUser } from 'src/redux/actions/user';
import moment from 'moment';

const styleSheet = (theme) => ({
	root: {
		minWidth: 393,
		position: 'relative',
		textAlign: 'left',
		padding: 20,
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
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
			modal: state.get('modal').toJS(),
			userView: state.getIn(['user', 'view']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleEditUserInfoModal,
			updateUser,
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
		style: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
			modal: PropTypes.object,
			userView: PropTypes.object,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleEditUserInfoModal: PropTypes.func,
			updateUser: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
	}

	state = {
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const userData = { ...values, id: this.props.store.userView.id };

				this.setState({ loading: true });

				this.props.action.updateUser(userData, () => {
					this.setState({ loading: false });

					this.props.action.toggleEditUserInfoModal({ open: false });
				});
			}
		});
	}

	render() {
		const { form: { getFieldDecorator }, classes, style, store: { userView }, action } = this.props;
		console.log('userView', userView);

		return (
			<div className={classes.root} style={style}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={() => action.toggleEditUserInfoModal({ open: false })} />
				<div className={classes.header}>
					Chỉnh sửa thông tin cá nhân
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<Row className={classes.formItem} type="flex">
						<span>
							<Button type="primary" style={{ background: '#E6EAED', border: 'solid 1px #F0F4F7', borderRadius: '50%', width: 70, height: 70 }}>
								<Icon type="plus" style={{ color: '#BACAD6', fontSize: 20 }} />
							</Button>
						</span>
						<span style={{ padding: '25px 0 0 20px' }}>
							Chọn ảnh đại diện
						</span>
					</Row>
					<Form.Item style={{ marginBottom: 0 }}>
						<div className={classes.formItem}>
							<div className={classes.formLabel}> Tên hiển thị </div>
							{getFieldDecorator('fullName', {
								initialValue: userView.fullName,
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
								initialValue: userView.birthday ? moment(userView.birthday) : '',
								rules: [{ required: true, message: 'Làm ơn nhập ngày sinh của bạn!' }],
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
									initialValue: userView.gender,
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
								initialValue: userView.email,
								rules: [{ required: true, message: 'Làm ơn nhập email của bạn!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email không hợp lệ!' }],
							})(
								<Input />,
							)}
						</div>
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						{getFieldDecorator('phone', {
							initialValue: userView.phone,
							rules: [{ required: true, message: 'Làm ơn nhập số điện thoại của bạn!' }],
						})(
							<div className={classes.formItem}>
								<div className={classes.formLabel}> Số điện thoại </div>
								<Input />
							</div>,
						)}
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
