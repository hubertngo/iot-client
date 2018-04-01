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
import moment from 'moment';

import withStyles from 'src/theme/jss/withStyles';

import { Form, Icon, Input, Button, Radio, Select, Row, Col, DatePicker, TimePicker, InputNumber } from 'antd';

import { locationOptions, flightOptions } from 'src/constants/selectOption';
import AuthStorage from 'src/utils/AuthStorage';

import IconDeparture from 'src/components/Photo/IconDeparture';

import { createFlight } from 'src/redux/actions/flight';
import { toggleTicketPosterModal } from 'src/redux/actions/modal';

import PosterDivider from './PosterDivider';

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
		lineHeight: '39.9999px',
	},
	action: {
		textAlign: 'right',
	},
	actionGroup: {
		// marginBottom: 15,
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
			createFlight,
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
		form: PropTypes.shape({
			validateFields: PropTypes.func,
			resetFields: PropTypes.func,
		}).isRequired,
		action: PropTypes.shape({
			createFlight: PropTypes.func,
			toggleTicketPosterModal: PropTypes.func,
		}).isRequired,
	}

	static defaultProps = {
	}

	state = {
		typeState: 'Sell',
		flightTypeState: 'One way',
		airlineState: flightOptions[0],
		departureState: '',
		destinationState: '',
	}

	changeValue = (field, value) => {
		this.state[field] = value;
		this.setState(this.state);
	}

	selectAirline = (val) => {
		const _this = this;
		flightOptions.forEach(item => {
			if (item.value === val) return _this.setState({ airlineState: item });
		});
	}

	getSelectedDate = (dateObj, timeObj) => {
		if (dateObj && timeObj) {
			dateObj.set('hour', timeObj.hour());
			dateObj.set('minute', timeObj.minute());
			return dateObj;
		}
		return null;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true,
				});

				const data = {
					...values,
					sellerId: AuthStorage.userId,
					status: 'Open',
					stock: 1,
					startDate: this.getSelectedDate(values.departureStartDate, values.departureStartTime),
					endDate: this.getSelectedDate(values.destinationStartDate, values.destinationStartTime),
				};

				this.props.action.createFlight(data, () => {
					this.setState({
						loading: false,
					}, () => {
						this.props.action.toggleTicketPosterModal({ open: false });
						this.props.form.resetFields();
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
		const { changeValue, selectAirline } = this;
		const { typeState, flightTypeState, airlineState, departureState, destinationState } = this.state;
		const { form: { getFieldDecorator }, classes, action } = this.props;

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
								<TextArea rows={4} style={{ resize: 'none' }} />
							</div>,
						)}
					</Form.Item>
					<Form.Item>
						<Row className={classes.formItem} type="flex">
							<Col span={3} className={classes.formLabel}> Loại vé </Col>
							<Col span={21}>
								{getFieldDecorator('flightType', {
									initialValue: flightTypeState,
								})(
									<Radio.Group setFieldValue={flightTypeState} onChange={(e) => changeValue('flightTypeState', e.target.value)}>
										<Radio value="One way"> Một chiều </Radio>
										<Radio value="Round trip"> Khứ hồi </Radio>
									</Radio.Group>,
								)}
							</Col>
						</Row>
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('seatNumber')(
							<div className={classes.formItem}>
								<Col span={3} className={classes.formLabel}> Số ghế </Col>
								<Col span={21}>
									{getFieldDecorator('seatsCount', {
										initialValue: 1,
									})(
										<InputNumber size="default" style={{ width: 70 }} />,
									)}
								</Col>
							</div>,
						)}
					</Form.Item>
					<Form.Item>
						<div className={classes.formItem}>
							<Col span={3} className={classes.formLabel}> Hãng </Col>
							<Col span={11}>
								{getFieldDecorator('airline', {
									initialValue: airlineState.value,
								})(
									<Select
										onChange={(val) => selectAirline(val)}
										setFieldValue={airlineState.value}
										size="default"
										style={{ width: 200 }}
									>
										{flightOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
									</Select>,
								)}
							</Col>
							{
								airlineState.value !== 'all' &&
								<Col span={10}> <img src={airlineState.logo} alt="airline_logo" style={{ height: 21 }} /> </Col>
							}
						</div>
					</Form.Item>
					<PosterDivider title="Chiều đi" titleWidth={13} />
					<Row className={classes.formItem} type="flex">
						<Col span={10}>
							<Form.Item>
								<div className={classes.formItem}>
									<div className={classes.formLabel}> Điểm xuất phát </div>
									{getFieldDecorator('departure')(
										<Select
											setFieldValue={departureState}
											onChange={(val) => changeValue('departureState', val)}
											size="default"
											style={{ width: '100%' }}
										>
											{locationOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
										</Select>,
									)}
								</div>
							</Form.Item>
						</Col>
						<Col span={4} style={{ textAlign: 'center', paddingTop: 45 }}> <IconDeparture color="#4368C4" /> </Col>
						<Col span={10}>
							<Form.Item>
								<div className={classes.formItem}>
									<div className={classes.formLabel}> Điểm đến </div>
									{getFieldDecorator('destination')(
										<Select
											setFieldValue={destinationState}
											onChange={(val) => changeValue('destinationState', val)}
											size="default"
											style={{ width: '100%' }}
										>
											{locationOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
										</Select>,
									)}
								</div>
							</Form.Item>
						</Col>
					</Row>
					<Row className={classes.formItem} type="flex" style={{ marginBottom: 10 }}>
						<Col span={20}>
							<div className={classes.formItem}>
								<div className={classes.formLabel}> Thời gian xuất phát </div>
								<div style={{ display: 'flex' }}>
									<Form.Item>
										{getFieldDecorator('departureStartDate')(
											<DatePicker format="DD/MM/YYY" />,
										)}
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('departureStartTime')(
											<TimePicker format="HH:mm" style={{ marginLeft: 20 }} />,
										)}
									</Form.Item>
								</div>
							</div>
						</Col>
					</Row>
					{
						flightTypeState !== 'One way' &&
						<div style={{ marginBottom: 24 }}>
							<PosterDivider title="Chiều về" titleWidth={13} />
							<Row className={classes.formItem} type="flex">
								<Col span={10}>
									<Form.Item>
										<div className={classes.formItem}>
											<div className={classes.formLabel}> Điểm xuất phát </div>
											{getFieldDecorator('departure')(
												<Select
													setFieldValue={departureState}
													onChange={(val) => changeValue('departureState', val)}
													size="default"
													style={{ width: '100%' }}
												>
													{locationOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
												</Select>,
											)}
										</div>
									</Form.Item>
								</Col>
								<Col span={4} style={{ textAlign: 'center', paddingTop: 45 }}> <IconDeparture color="#4368C4" style={{ transform: 'rotateY(180deg)' }} /> </Col>
								<Col span={10}>
									<Form.Item>
										<div className={classes.formItem}>
											<div className={classes.formLabel}> Điểm đến </div>
											{getFieldDecorator('destination')(
												<Select
													setFieldValue={destinationState}
													onChange={(val) => changeValue('destinationState', val)}
													size="default"
													style={{ width: '100%' }}
												>
													{locationOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
												</Select>,
											)}
										</div>
									</Form.Item>
								</Col>
							</Row>
							<Row className={classes.formItem} type="flex" style={{ marginBottom: 10 }}>
								<Col span={20}>
									<div className={classes.formItem}>
										<div className={classes.formLabel}> Thời gian xuất phát </div>
										<div style={{ display: 'flex' }}>
											<Form.Item>
												{getFieldDecorator('departureStartDate')(
													<DatePicker format="DD/MM/YYY" />,
												)}
											</Form.Item>
											<Form.Item>
												{getFieldDecorator('departureStartTime')(
													<TimePicker format="HH:mm" style={{ marginLeft: 20 }} />,
												)}
											</Form.Item>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					}
					<PosterDivider title="Thông tin khác" titleWidth={23} />
					<Form.Item>
						<Row className={classes.formItem} type="flex">
							<Col span={6} className={classes.formLabel}> Loại ghế </Col>
							<Col span={18}>
								{getFieldDecorator('seatType', {
									initialValue: 'Promo',
								})(
									<Radio.Group>
										<Radio value="Promo"> Promo </Radio>
										<Radio value="Eco"> Eco </Radio>
										<Radio value="Skyboss"> Skyboss </Radio>
									</Radio.Group>,
								)}
							</Col>
						</Row>
					</Form.Item>
					<Form.Item>
						<Row className={classes.formItem} type="flex">
							<Col span={6} className={classes.formLabel}> Số kg hành lý </Col>
							<Col span={18}>
								{getFieldDecorator('packageWeight', {
									initialValue: 7,
								})(
									<Radio.Group>
										<Radio value={7}> 7kg </Radio>
										<Radio value={20}> 20kg </Radio>
										<Radio value={-1}>
											Khác
											<span style={{ marginLeft: 20 }}>
												<Input type="number" size="default" maxLength="25" style={{ width: 90 }} suffix="KG" />
											</span>
										</Radio>
									</Radio.Group>
									,
								)}
							</Col>
						</Row>
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
						<Form.Item>
							<div className={classes.actionGroup}>
								{getFieldDecorator('type', {
									initialValue: typeState,
								})(
									<Radio.Group setFieldValue={typeState} onChange={(e) => changeValue('typeState', e.target.value)}>
										<Radio.Button value="Buy"> Mua </Radio.Button>
										<Radio.Button value="Bid"> Đấu thầu </Radio.Button>
										<Radio.Button value="Sell"> Cố định </Radio.Button>
									</Radio.Group>,
								)}
							</div>
						</Form.Item>
						<Form.Item>
							{
								typeState !== 'Buy' &&
									<div className={classes.actionGroup}>
										<span> { typeState === 'Sell' ? 'Giá đăng bán' : 'Giá khởi điểm' } </span>
										<span>
											{getFieldDecorator('price', {
												initialValue: 0,
											})(
												<InputNumber
													formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													className="price"
													style={{ width: 150, marginLeft: 10 }}
												/>,
											)}
										</span>
									</div>
							}
						</Form.Item>
						<div className={classes.actionGroup}>
							<Button type="primary" htmlType="submit" loading={this.state.loading}> Đăng tin </Button>
							<Button style={{ marginLeft: 10 }} htmlType="submit" loading={this.state.loading} onClick={() => action.toggleTicketPosterModal({ open: false })}>Hủy</Button>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

