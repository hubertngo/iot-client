/* --------------------------------------------------------
* Author Lê Quang Thịnh
* Email lqthinh93@gmail.com
* Phone 0937341717
*
* Created: 2018-03-25 17:32:30
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';

import { Form, Icon, Input, Button, Radio, Select, Row, Col, Menu, Dropdown } from 'antd';
import PosterDivider from './PosterDivider';
import IconDeparture from 'src/components/Photo/IconDeparture';

import { toggleTicketPosterModal } from 'src/redux/actions/modal';

import { locationOptions } from 'src/constants/selectOption';

const { TextArea } = Input;
const { Option } = Select;

const styleSheet = (theme) => ({
	root: {
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
	form: {

	},
	formItem: {

	},
	formLabel: {
	},
	action: {
		textAlign: 'right',
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
			toggleTicketPosterModal,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class TicketPosterForm extends Component {
  static propTypes = {
  	classes: PropTypes.object.isRequired,
  	action: PropTypes.shape({
  		toggleTicketPosterModal: PropTypes.func.isRequired,
  	}).isRequired,
  }

  static defaultProps = {
  }

	state = {
	}

	handleSubmit = () => {

	}

	_handleDepartureChange = (value) => {
	}

	_handleDestinationChange = (value) => {
	}

	render() {
		const { form: { getFieldDecorator }, classes, action } = this.props;
		const menuDeparture = (
			<Menu className={classes.dropdownMenu} onClick={this._handleDepartureChange}>
				{locationOptions.map(location => <Menu.Item key={location.value}>{location.label}</Menu.Item>)}
			</Menu>
		);
		const menuDestination = (
			<Menu className={classes.dropdownMenu} onClick={this._handleDestinationChange}>
				{locationOptions.map(location => <Menu.Item key={location.value}>{location.label}</Menu.Item>)}
			</Menu>
		);
		return (
			<div className={classes.root}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={() => action.toggleTicketPosterModal({ open: false })} />
				<div className={classes.header}>
					Nhập thông tin bán vé
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<Form.Item>
						{getFieldDecorator('content', {
							rules: [{ required: true, message: 'Làm ơn nhập nội dung tin đăng' }],
						})(
							<div className={classes.formItem}>
								<div className={classes.formLabel}> Nội dung tin đăng </div>
								<TextArea className="radius-small" rows={4} style={{ resize: 'none' }} />
							</div>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('ticketType')(
							<Row className={classes.formItem} type="flex">
								<Col span={3} className={classes.formLabel}> Loại vé </Col>
								<Col span={21}>
									<Radio.Group>
										<Radio value={1}> Một chiều </Radio>
										<Radio value={2}> Khứ hồi </Radio>
									</Radio.Group>
								</Col>
							</Row>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('seatNumber')(
							<div className={classes.formItem}>
								<Col span={3} className={classes.formLabel}> Số ghế </Col>
								<Col span={21}> <Input size="default" className="radius-small" maxLength="25" style={{ width: 70 }} /> </Col>
							</div>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('flight')(
							<div className={classes.formItem}>
								<Col span={3} className={classes.formLabel}> Hãng </Col>
								<Col span={11}>
									<Select
										size="default"
										style={{ width: 200 }}
									>
										<Option key={1}> Vietnam Airline </Option>
									</Select>
								</Col>
								<Col span={10}> Vietnam Airline </Col>
							</div>,
						)}
					</Form.Item>
					<PosterDivider title="Chiều đi" titleWidth={13} />
					<Row className={classes.formItem} type="flex">
						<Col span={10}>
							<Dropdown overlay={menuDeparture} trigger={['click']}>
								<Form.Item>
									{getFieldDecorator('content')(
										<div className={classes.formItem}>
											<div className={classes.formLabel}> Điểm xuất phát </div>
											<Input size="default" className="radius-small" maxLength="25" style={{ width: '100%' }} />
										</div>,
									)}
								</Form.Item>
							</Dropdown>
						</Col>
						<Col span={4} style={{ textAlign: 'center', paddingTop: 45 }}> <IconDeparture extended color="#4368C4" /> </Col>
						<Col span={10}>
							<Dropdown overlay={menuDestination} trigger={['click']} >
								<Form.Item>
									{getFieldDecorator('content')(
										<div className={classes.formItem}>
											<div className={classes.formLabel}> Điểm đến </div>
											<Input size="default" className="radius-small" maxLength="25" style={{ width: '100%' }} />
										</div>,
									)}
								</Form.Item>
							</Dropdown>
						</Col>
					</Row>
					<Row className={classes.formItem} type="flex">
						<Col span={10}>
							<Form.Item>
								{getFieldDecorator('content')(
									<div className={classes.formItem}>
										<div className={classes.formLabel}> Thời gian xuất phát </div>
										<Input size="default" className="radius-small" maxLength="25" style={{ width: '100%' }} />
									</div>,
								)}
							</Form.Item>
						</Col>
						<Col span={4} />
						<Col span={10}>
							<Form.Item>
								{getFieldDecorator('content')(
									<div className={classes.formItem}>
										<div className={classes.formLabel}> Thời gian hạ cánh </div>
										<Input size="default" className="radius-small" maxLength="25" style={{ width: '100%' }} />
									</div>,
								)}
							</Form.Item>
						</Col>
					</Row>
					<PosterDivider title="Thông tin khác" titleWidth={23} />
					<Form.Item>
						{getFieldDecorator('seatType')(
							<Row className={classes.formItem} type="flex">
								<Col span={6} className={classes.formLabel}> Loại ghế </Col>
								<Col span={18}>
									<Radio.Group>
										<Radio value={1}> Promo </Radio>
										<Radio value={2}> Eco </Radio>
										<Radio value={3}> Skyboss </Radio>
									</Radio.Group>
								</Col>
							</Row>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('packageWeight')(
							<Row className={classes.formItem} type="flex">
								<Col span={6} className={classes.formLabel}> Số kg hành lý </Col>
								<Col span={18}>
									<Radio.Group>
										<Radio value={1}> 7kg </Radio>
										<Radio value={2}> 20kg </Radio>
										<Radio value={3}> Khác </Radio>
									</Radio.Group>
									<span>
										<Input size="default" className="radius-small" maxLength="25" style={{ width: 90 }} suffix="KG" />
									</span>
								</Col>
							</Row>,
						)}
					</Form.Item>
					<Row className={classes.formItem} type="flex">
						<span>
							<Button type="primary" style={{ background: '#E6EAED', border: 'solid 1px #F0F4F7', width: 70, height: 70 }}>
								<Icon type="plus" style={{ color: '#BACAD6', fontSize: 20 }} />
							</Button>
						</span>
						<span style={{ lineHeight: '65px', marginLeft: '15px' }} >
							Đính kèm ảnh sản phẩm
						</span>
					</Row>
					<PosterDivider />
					<div className={classes.action}>
						<div className={classes.actionGroup}>
							<Button.Group>
								<Button> Đấu thầu</Button>
								<Button> Cố định </Button>
							</Button.Group>
						</div>
						<div className={classes.actionGroup}>
							<span> Giá khởi điểm </span>
							<span> <Input size="default" className="radius-small" maxLength="25" style={{ width: 150 }} suffix="VNĐ" /> </span>
						</div>
						<div className={classes.actionGroup}>
							<Button type="primary"> Đăng tin </Button>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

