/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-04-02 00:25:00
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'src/theme/jss/withStyles';
import { injectIntl, intlShape } from 'react-intl';
import getAirport from 'src/utils/getAirport';

import { Form, Icon, Input, Button, Radio, Select, Row, Col, TimePicker, InputNumber, Upload, AutoComplete } from 'antd';
import DatePicker from 'src/components/DatePickerLunar';

import { locationOptions, flightOptions } from 'src/constants/selectOption';
import AuthStorage from 'src/utils/AuthStorage';

import IconDeparture from 'src/components/Photo/IconDeparture';

import { getUserTicketSellingList, getTicketSellingData, updateTicketSelling } from 'src/redux/actions/ticket-selling';
import { getUserTicketBuyingList } from 'src/redux/actions/ticket-buying';
import { toggleEditSellingModal } from 'src/redux/actions/modal';
import { uploadFiles } from 'src/redux/actions/upload';

import { getLabel } from 'src/utils';
import moment from 'moment';
import PosterDivider from './PosterDivider';

const { TextArea } = Input;
const { Option } = Select;

const styleSheet = (/* theme */) => ({
	root: {
		position: 'relative',
		textAlign: 'left',
		padding: 20,

		'& .ant-upload.ant-upload-select-picture-card': {
			width: 70,
			height: 70,
		},

		'& .ant-upload-list-picture-card .ant-upload-list-item': {
			width: 70,
			height: 70,
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
	form: {

	},
	formItem: {
		'& > span': {
			display: 'flex',
		},
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
			ticketSellingView: state.getIn(['ticketSelling', 'view']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getUserTicketSellingList,
			getUserTicketBuyingList,
			toggleEditSellingModal,
			uploadFiles,
			getTicketSellingData,
			updateTicketSelling,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
@injectIntl
export default class TicketPosterForm extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		form: PropTypes.shape({
			validateFields: PropTypes.func,
			resetFields: PropTypes.func,
		}).isRequired,
		action: PropTypes.shape({
			getUserTicketSellingList: PropTypes.func.isRequired,
			getUserTicketBuyingList: PropTypes.func.isRequired,
			toggleEditSellingModal: PropTypes.func,
			uploadFiles: PropTypes.func,
			updateTicketSelling: PropTypes.func,
			getTicketSellingData: PropTypes.func,
		}).isRequired,
		store: PropTypes.shape({
			modal: PropTypes.object,
		}).isRequired,
		intl: intlShape.isRequired,
	}

	static defaultProps = {
	}

	state = {
		loading: false,
		fileList: [],
		destinationSource: [],
		departureSource: [],
	}

	componentDidMount() {
		this.props.action.getTicketSellingData({
			id: this.props.store.modal.editSelling.id,
			filter: {
				include: [
					{
						relation: 'creator',
						scope: {
							fields: ['id', 'username', 'avatar', 'fullName', 'ratingsCount', 'ratingsStats'],
						},
					},
				],
			},
		});
	}

	filter = {
		limit: 4,
		skip: 0,
		page: 1,
		include: [
			{
				relation: 'creator',
				scope: {
					fields: ['id', 'username', 'avatar', 'fullName'],
				},
			},
		],
		where: {
			status: 'open',
			creatorId: AuthStorage.userId,
		},
	}

	validateSeatCount = (rule, seatCount, callback) => {
		const { formatMessage } = this.props.intl;

		if (seatCount < 1) {
			callback(formatMessage({ id: 'validate_seat_count' }));
		} else {
			callback();
		}
	}

	validateDestination = (rule, destination, callback) => {
		const { form, intl: { formatMessage } } = this.props;
		const departure = form.getFieldValue('trip.departure');

		if (departure === destination) {
			callback(formatMessage({ id: 'departure_destination_not_equal' }));
		} else {
			callback();
		}
	}

	validateTripStartDate = (rule, tripStartDate, callback) => {
		const { formatMessage } = this.props.intl;
		if (!tripStartDate) {
			return callback();
		}
		if (moment().isAfter(tripStartDate, 'day')) {
			callback(formatMessage({ id: 'validate_trip_start_date' }));
		} else {
			callback();
		}
	}

	validateTripStartTime = (rule, tripStartTime, callback) => {
		if (!tripStartTime) {
			return callback();
		}
		const { form, intl: { formatMessage } } = this.props;
		const tripStartDate = form.getFieldValue('trip.startDate');
		const tripStart = moment(tripStartDate).hours(tripStartTime.hours()).minutes(tripStartTime.minutes());

		if (tripStart.isBefore(moment())) {
			callback(formatMessage({ id: 'validate_trip_start_time' }));
		} else {
			callback();
		}
	}

	validateTripEndDate = (rule, tripEndDate, callback) => {
		if (!tripEndDate) {
			return callback();
		}
		const { form, intl: { formatMessage } } = this.props;
		const tripStartDate = form.getFieldValue('trip.startDate');

		if (tripEndDate.isBefore(tripStartDate, 'day')) {
			callback(formatMessage({ id: 'validate_trip_end_date' }));
		} else {
			callback();
		}
	}

	validateTripEndTime = (rule, tripEndTime, callback) => {
		if (!tripEndTime) {
			return callback();
		}
		const { form, intl: { formatMessage } } = this.props;
		const tripStartDate = form.getFieldValue('trip.startDate');
		const tripStartTime = form.getFieldValue('trip.startTime');
		const tripEndDate = form.getFieldValue('trip.endDate');
		const tripStart = moment(tripStartDate).hours(tripStartTime.hours()).minutes(tripStartTime.minutes());
		const tripEnd = moment(tripEndDate).hours(tripEndTime.hours()).minutes(tripEndTime.minutes());

		if (tripEnd.isSameOrBefore(tripStart)) {
			callback(formatMessage({ id: 'validate_trip_end_time' }));
		} else {
			callback();
		}
	}

	validateTripBackStartDate = (rule, tripBackStartDate, callback) => {
		if (!tripBackStartDate) {
			return callback();
		}
		const { form, intl: { formatMessage } } = this.props;
		const tripEndDate = form.getFieldValue('trip.endDate');
		if (tripBackStartDate.isBefore(tripEndDate, 'day')) {
			callback(formatMessage({ id: 'validate_trip_back_start_date' }));
		} else {
			callback();
		}
	}

	validateTripBackStartTime = (rule, tripBackStartTime, callback) => {
		if (!tripBackStartTime) {
			return callback();
		}
		const { form, intl: { formatMessage } } = this.props;
		const tripEndDate = form.getFieldValue('trip.endDate');
		const tripEndTime = form.getFieldValue('trip.endTime');
		const tripEnd = moment(tripEndDate).hours(tripEndTime.hours()).minutes(tripEndTime.minutes());
		const tripBackStartDate = form.getFieldValue('tripBack.startDate');
		const tripBackStart = moment(tripBackStartDate).hours(tripBackStartTime.hours()).minutes(tripBackStartTime.minutes());

		if (tripBackStart.isSameOrBefore(tripEnd)) {
			callback(formatMessage({ id: 'validate_trip_back_start_time' }));
		} else {
			callback();
		}
	}

	validateTripBackEndDate = (rule, tripBackEndDate, callback) => {
		if (!tripBackEndDate) {
			return callback();
		}
		const { form, intl: { formatMessage } } = this.props;
		const tripBackStartDate = form.getFieldValue('tripBack.startDate');

		if (tripBackEndDate.isBefore(tripBackStartDate, 'day')) {
			callback(formatMessage({ id: 'validate_trip_back_end_date' }));
		} else {
			callback();
		}
	}

	validateTripBackEndTime = (rule, tripBackEndTime, callback) => {
		if (!tripBackEndTime) {
			return callback();
		}
		const { form, intl: { formatMessage } } = this.props;
		const tripBackStartDate = form.getFieldValue('tripBack.startDate');
		const tripBackStartTime = form.getFieldValue('tripBack.startTime');
		const tripBackEndDate = form.getFieldValue('tripBack.endDate');
		const tripBackStart = moment(tripBackStartDate).hours(tripBackStartTime.hours()).minutes(tripBackStartTime.minutes());
		const tripBackEnd = moment(tripBackEndDate).hours(tripBackEndTime.hours()).minutes(tripBackEndTime.minutes());

		if (tripBackEnd.isSameOrBefore(tripBackStart)) {
			callback(formatMessage({ id: 'validate_trip_back_end_time' }));
		} else {
			callback();
		}
	}

	handleChange = ({ fileList }) => this.setState({ fileList })

	timeout = null

	handleSearchDeparture = (value) => {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.searchAirport.bind(this, value, 'departureSource'), 300);
	}

	handleSearchDestination = (value) => {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.searchAirport.bind(this, value, 'destinationSource'), 300);
	}

	searchAirport = (query, stateName) => {
		getAirport(query).then(response => {
			const source = response.map(item => `${item.PlaceName} (${item.PlaceId})`);
			this.setState({ [stateName]: source });
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { packageWeight, packageWeightOther, type, trip, tripBack, ...dataSend } = values;

				dataSend.id = this.props.store.modal.editSelling.id;
				dataSend.isBid = type === 'bid';

				dataSend.packageWeight = packageWeight !== -1 ? packageWeight : ~~packageWeightOther;
				dataSend.dueDate = moment(trip.startDate).hours(trip.startTime.hours(), trip.startTime.minutes());

				dataSend.trip = {
					...trip,
					startDate: trip.startDate.format('DD/MM/YYYY'),
					startTime: trip.startTime.format('HH:mm'),
				};

				if (tripBack) {
					dataSend.tripBack = {
						...tripBack,
						startDate: tripBack.startDate.format('DD/MM/YYYY'),
						startTime: tripBack.startTime.format('HH:mm'),
					};
				}

				dataSend.creatorId = AuthStorage.userId;

				this.setState({
					loading: true,
				});

				this.props.action.uploadFiles({ files: this.state.fileList }, (imageList = []) => {
					dataSend.images = imageList;

					this.props.action.updateTicketSelling(dataSend, () => {
						this.setState({
							loading: false,
						}, () => {
							this.props.action.toggleEditSellingModal({ open: false });
							this.props.form.resetFields();

							const p1 = new Promise((resolve) => {
								this.props.action.getUserTicketSellingList({ filter: this.filter, firstLoad: true }, () => {
									resolve();
								});
							});

							const p2 = new Promise((resolve) => {
								this.props.action.getUserTicketBuyingList({ filter: this.filter, firstLoad: true }, () => {
									resolve();
								});
							});

							Promise.all([
								p1,
								p2,
							]).then(() => {
								this.setState({ loading: false });
							});
						});
					}, () => {
						this.setState({
							loading: false,
						});
					});
				});
			}
		});
	}

	render() {
		const { form: { getFieldDecorator, getFieldValue }, classes, action, store: { ticketSellingView }, intl: { formatMessage } } = this.props;
		const { trip = {}, tripBack = {} } = ticketSellingView;

		return (
			<div className={classes.root}>
				<Icon type="close-circle" className={classes.closeBtn} onClick={this.state.loading ? f => f : () => action.toggleEditSellingModal({ open: false })} />
				<div className={classes.header}>
					{formatMessage({ id: 'fill_ticket_selling' })}
				</div>
				<Form onSubmit={this.handleSubmit} className={classes.form}>
					<Form.Item>
						<div className={classes.formItem}>
							<div className={classes.formLabel}> {formatMessage({ id: 'comment_content' })} </div>
							{getFieldDecorator('content', {
								rules: [{ required: true, message: formatMessage({ id: 'comment_content_required' }) }],
								initialValue: ticketSellingView.content,
							})(
								<TextArea rows={4} style={{ resize: 'none' }} />,
							)}
						</div>
					</Form.Item>
					<Form.Item>
						<Row className={classes.formItem} type="flex">
							<Col col={3} xs={4} className={classes.formLabel}>{formatMessage({ id: 'ticket_type' })}</Col>
							<Col col={21} xs={20}>
								{getFieldDecorator('flightType', {
									initialValue: ticketSellingView.flightType,
								})(
									<Radio.Group>
										<Radio value="oneWay"> {formatMessage({ id: 'one_way' })} </Radio>
										<Radio value="roundTrip"> {formatMessage({ id: 'round_trip' })} </Radio>
									</Radio.Group>,
								)}
							</Col>
						</Row>
					</Form.Item>
					<Form.Item>
						<div className={classes.formItem}>
							<Col col={3} xs={4} className={classes.formLabel}>{formatMessage({ id: 'ticket_seat_count' })}</Col>
							<Col col={21} xs={20}>
								{getFieldDecorator('seatCount', {
									initialValue: ticketSellingView.seatCount,
									rules: [{ required: true, message: formatMessage({ id: 'seat_count_required' }) }, { validator: this.validateSeatCount }],
								})(
									<InputNumber size="default" style={{ width: 70 }} />,
								)}
							</Col>
						</div>
					</Form.Item>
					<Form.Item>
						<div className={classes.formItem}>
							<Col col={3} xs={4} className={classes.formLabel}> {formatMessage({ id: 'airline' })} </Col>
							<Col col={21} xs={20}>
								{getFieldDecorator('airline', {
									initialValue: ticketSellingView.airline,
								})(
									<Select
										size="default"
										style={{ width: 200 }}
									>
										{flightOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
									</Select>,
								)}
							</Col>
							{
								getLabel(getFieldValue('airline'), flightOptions).value !== 'all' &&
								<Col span={10}> <img src={getLabel(getFieldValue('airline'), flightOptions).logo} alt="airline_logo" style={{ height: 21 }} /> </Col>
							}
						</div>
					</Form.Item>
					<PosterDivider title={formatMessage({ id: 'way_to_go' })} titleWidth={13} />
					<Row className={classes.formItem} type="flex">
						<Col span={10}>
							<Form.Item>
								<div className={classes.formItem}>
									<div className={classes.formLabel}> {formatMessage({ id: 'departure' })} </div>
									{getFieldDecorator('trip.departure', {
										rules: [{ required: true, message: formatMessage({ id: 'departure_required' }) }],
										initialValue: trip.departure,
									})(
										<AutoComplete
											dataSource={this.state.departureSource}
											style={{ width: '100%' }}
											size="default"
											onSearch={this.handleSearchDeparture}
										/>,
									)}
								</div>
							</Form.Item>
						</Col>
						<Col span={4} style={{ textAlign: 'center', paddingTop: 45 }}> <IconDeparture color="#4368C4" /> </Col>
						<Col span={10}>
							<Form.Item>
								<div className={classes.formItem}>
									<div className={classes.formLabel}> {formatMessage({ id: 'destination' })} </div>
									{getFieldDecorator('trip.destination', {
										rules: [{ required: true, message: formatMessage({ id: 'destination_required' }) }, { validator: this.validateDestination }],
										initialValue: trip.destination,
									})(
										<AutoComplete
											dataSource={this.state.destinationSource}
											style={{ width: '100%' }}
											size="default"
											onSearch={this.handleSearchDestination}
										/>,
									)}
								</div>
							</Form.Item>
						</Col>
					</Row>
					<Row className={classes.formItem} type="flex" style={{ marginBottom: 10 }}>
						<Col span={20}>
							<div className={classes.formItem}>
								<div className={classes.formLabel}> {formatMessage({ id: 'start_date' })} </div>
								<div style={{ display: 'flex' }}>
									<Form.Item>
										{getFieldDecorator('trip.startDate', {
											rules: [{ type: 'object', required: true, message: formatMessage({ id: 'start_date_required' }) }, { validator: this.validateTripStartDate }],
											initialValue: moment(trip.startDate),
										})(
											<DatePicker
												format="DD/MM/YYYY"
												disabledDate={
													(current) => {
														// Can not select days before today and today
														return current && current < moment().endOf('day');
													}
												}
											/>,
										)}
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('trip.startTime', {
											rules: [{ type: 'object', required: true, message: formatMessage({ id: 'start_time_required' }) }, { validator: this.validateTripStartTime }],
											initialValue: moment(trip.startTime, 'HH:mm'),
										})(
											<TimePicker format="HH:mm" style={{ marginLeft: 20 }} />,
										)}
									</Form.Item>
								</div>
							</div>
							<div className={classes.formItem}>
								<div className={classes.formLabel}> {formatMessage({ id: 'end_date' })} </div>
								<div style={{ display: 'flex' }}>
									<Form.Item>
										{getFieldDecorator('trip.endDate', {
											rules: [{ type: 'object', required: true, message: formatMessage({ id: 'end_date_required' }) }, { validator: this.validateTripEndDate }],
											initialValue: moment(trip.endDate),
										})(
											<DatePicker
												format="DD/MM/YYYY"
												disabledDate={
													(current) => {
														const tripStartDate = getFieldValue('trip.startDate');
														// Can not select days before today and today
														return current && current.isBefore(tripStartDate, 'day');
													}
												}
											/>,
										)}
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('trip.endTime', {
											rules: [{ type: 'object', required: true, message: formatMessage({ id: 'end_time' }) }, { validator: this.validateTripEndTime }],
											initialValue: moment(trip.endTime, 'HH:mm'),
										})(
											<TimePicker format="HH:mm" style={{ marginLeft: 20 }} />,
										)}
									</Form.Item>
								</div>
							</div>
						</Col>
					</Row>
					{
						getFieldValue('flightType') !== 'oneWay' &&
						<div style={{ marginBottom: 24 }}>
							<PosterDivider title={formatMessage({ id: 'way_to_back' })} titleWidth={13} />
							<Row className={classes.formItem} type="flex">
								<Col span={10}>
									<Form.Item>
										<div className={classes.formItem}>
											<div className={classes.formLabel}> {formatMessage({ id: 'departure' })} </div>
											{getFieldDecorator('tripBack.departure', {
												rules: [{ required: true, message: formatMessage({ id: 'departure_required' }) }],
												initialValue: tripBack.departure,
											})(
												<Select
													size="default"
													style={{ width: '100%' }}
													disabled
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
											<div className={classes.formLabel}> {formatMessage({ id: 'destination' })} </div>
											{getFieldDecorator('tripBack.destination', {
												rules: [{ required: true, message: formatMessage({ id: 'destination_required' }) }],
												initialValue: tripBack.destination,
											})(
												<Select
													size="default"
													style={{ width: '100%' }}
													disabled
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
										<div className={classes.formLabel}> {formatMessage({ id: 'start_date' })} </div>
										<div style={{ display: 'flex' }}>
											<Form.Item>
												{getFieldDecorator('tripBack.startDate', {
													rules: [{ type: 'object', required: true, message: formatMessage({ id: 'start_date_required' }) }, { validator: this.validateTripBackStartDate }],
													initialValue: moment(tripBack.startDate),
												})(
													<DatePicker
														format="DD/MM/YYYY"
														disabledDate={
															(current) => {
																const tripEndDate = getFieldValue('trip.endDate');
																// Can not select days before today and today
																return current && current.isBefore(tripEndDate, 'day');
															}
														}
													/>,
												)}
											</Form.Item>
											<Form.Item>
												{getFieldDecorator('tripBack.startTime', {
													rules: [{ type: 'object', required: true, message: formatMessage({ id: 'start_time_required' }) }, { validator: this.validateTripBackStartTime }],
													initialValue: moment(tripBack.startTime, 'HH:mm'),
												})(
													<TimePicker format="HH:mm" style={{ marginLeft: 20 }} />,
												)}
											</Form.Item>
										</div>
									</div>
									<div className={classes.formItem}>
										<div className={classes.formLabel}> {formatMessage({ id: 'end_date' })} </div>
										<div style={{ display: 'flex' }}>
											<Form.Item>
												{getFieldDecorator('tripBack.endDate', {
													rules: [{ type: 'object', required: true, message: formatMessage({ id: 'end_date_required' }) }, { validator: this.validateTripBackEndDate }],
													initialValue: moment(tripBack.endDate),
												})(
													<DatePicker
														format="DD/MM/YYYY"
														disabledDate={
															(current) => {
																const tripBackStartDate = getFieldValue('tripBack.startDate');
																// Can not select days before today and today
																return current && current.isBefore(tripBackStartDate, 'day');
															}
														}
													/>,
												)}
											</Form.Item>
											<Form.Item>
												{getFieldDecorator('tripBack.endTime', {
													rules: [{ type: 'object', required: true, message: formatMessage({ id: 'end_time_required' }) }, { validator: this.validateTripBackEndTime }],
													initialValue: moment(tripBack.endTime, 'HH:mm'),
												})(
													<TimePicker format="HH:mm" style={{ marginLeft: 20 }} />,
												)}
											</Form.Item>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					}
					<PosterDivider title={formatMessage({ id: 'other_info' })} titleWidth={23} />
					<Form.Item>
						<Row className={classes.formItem} type="flex">
							<Col span={6} className={classes.formLabel}> {formatMessage({ id: 'seat_type' })} </Col>
							<Col span={18}>
								{getFieldDecorator('seatType', {
									initialValue: ticketSellingView.seatType,
								})(
									<Radio.Group>
										<Radio value="promo"> Promo </Radio>
										<Radio value="eco"> Eco </Radio>
										<Radio value="skyboss"> Skyboss </Radio>
									</Radio.Group>,
								)}
							</Col>
						</Row>
					</Form.Item>
					<Form.Item>
						<Row className={classes.formItem} type="flex">
							<Col span={6} className={classes.formLabel}>{formatMessage({ id: 'package_weight' })} </Col>
							<Col span={18} style={{ display: 'flex' }}>
								{getFieldDecorator('packageWeight', {
									initialValue: ticketSellingView.packageWeight,
								})(
									<Radio.Group>
										<Radio value={7}> 7kg </Radio>
										<Radio value={20}> 20kg </Radio>
										<Radio value={-1}> {formatMessage({ id: 'other' })} </Radio>
									</Radio.Group>,
								)}
								{
									getFieldValue('packageWeight') === -1 &&
									<Form.Item style={{ margin: 0 }}>
										{getFieldDecorator('packageWeightOther', {
											rules: [{ required: true, message: formatMessage({ id: 'package_weight_requried' }) }],
											initialValue: ticketSellingView.packageWeight,
										})(
											<Input type="number" autoFocus size="default" maxLength="25" style={{ width: 90, marginLeft: 10 }} suffix="KG" />,
										)}
									</Form.Item>
								}
							</Col>
						</Row>
					</Form.Item>
					<Row className={classes.formItem} type="flex">
						{/* <span>
							<Button type="primary" style={{ background: '#E6EAED', border: 'solid 1px #F0F4F7', width: 70, height: 70 }}>
								<Icon type="plus" style={{ color: '#BACAD6', fontSize: 20 }} />
							</Button>
						</span> */}
						<Upload
							// action="//jsonplaceholder.typicode.com/posts/"
							listType="picture-card"
							fileList={this.state.fileList}
							onChange={this.handleChange}
						>
							{this.state.fileList.length >= 3 ? null : <Icon type="plus" style={{ color: '#BACAD6', fontSize: 20 }} />}
						</Upload>
						<span style={{ lineHeight: '65px', marginLeft: '15px' }} >
							{formatMessage({ id: 'attached_image' })}
						</span>
					</Row>
					<PosterDivider />
					<div className={classes.action}>
						{/* <Form.Item>
							<div className={classes.actionGroup}>
								{getFieldDecorator('type', {
									initialValue: 'sell',
								})(
									<Radio.Group>
										<Radio.Button value="bid"> Đấu thầu </Radio.Button>
										<Radio.Button value="sell"> Cố định </Radio.Button>
									</Radio.Group>,
								)}
							</div>
						</Form.Item>
						<Form.Item>
							{
								getFieldValue('type') !== 'Buy' &&
								<div className={classes.actionGroup}>
									<span> {getFieldValue('type') === 'Sell' ? 'Giá đăng bán' : 'Giá khởi điểm'} </span>
									<span>
										{getFieldDecorator('price', {
											rules: [{ required: true, message: 'Làm ơn nhập giá' }],
										})(
											<InputNumber
												formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												className="price"
												style={{ width: 150, marginLeft: 10, marginRight: 0 }}
											/>,
										)}
									</span>
								</div>
							}
						</Form.Item> */}
						<div className={classes.actionGroup}>
							<Button type="primary" htmlType="submit" loading={this.state.loading}> {formatMessage({ id: 'editing' })} </Button>
							<Button style={{ marginLeft: 10 }} disabled={this.state.loading} onClick={() => action.toggleTicketPosterModal({ open: false })}>{formatMessage({ id: 'cancel' })}</Button>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

