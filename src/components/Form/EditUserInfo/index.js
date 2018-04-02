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

import { Form, Icon, Row, Col, Button, Input, Radio } from 'antd';
import Avatar from 'src/components/Photo/Avatar';

import withStyles from 'src/theme/jss/withStyles';

import { toggleEditUserInfoModal } from 'src/redux/actions/modal';

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
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleEditUserInfoModal,
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
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleEditUserInfoModal,
		}).isRequired,
	}

  static defaultProps = {
  }

	state = {
	}

	render() {
		const { form: { getFieldDecorator }, classes, style, store, action } = this.props;

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
						{getFieldDecorator('fullName', {
							rules: [{ required: true, message: 'Làm ơn nhập tên của bạn!' }],
						})(
							<div className={classes.formItem}>
								<div className={classes.formLabel}> Tên hiển thị </div>
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Họ và Tên" />
							</div>,
						)}
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						{getFieldDecorator('birthday', {
							rules: [{ required: true, message: 'Làm ơn nhập ngày sinh của bạn!' }],
						})(
							<div className={classes.formItem}>
								<div className={classes.formLabel}> Ngày tháng năm sinh </div>
								<Input placeholder="dd/mm/yyyy" />
							</div>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('gender')(
							<Row className={classes.formItem} type="flex">
								<Col span={6} className={classes.formLabel}> Giới tính </Col>
								<Col span={18}>
									<Radio.Group>
										<Radio value="Promo"> Nam </Radio>
										<Radio value="Eco"> Nữ </Radio>
									</Radio.Group>
								</Col>
							</Row>,
						)}
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Làm ơn nhập email của bạn!' }],
						})(
							<div className={classes.formItem}>
								<div className={classes.formLabel}> Email </div>
								<Input />
							</div>,
						)}
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						{getFieldDecorator('phone', {
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
