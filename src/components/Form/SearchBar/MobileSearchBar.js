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
import { injectIntl, intlShape } from 'react-intl';

import { Input, Menu, Dropdown, Select, Form, Button, Row, Col, notification, Radio } from 'antd';

import IconDeparture from 'src/components/Photo/IconDeparture';
import IconDestination from 'src/components/Photo/IconDestination';

import withStyles from 'src/theme/jss/withStyles';

import { locationOptions } from 'src/constants/selectOption';
import DatePicker from 'src/components/DatePickerLunar';
import moment from 'moment';

const styleSheet = (theme) => ({
	formWrapper: {
		padding: '0 10px',

	},
	root: {
		marginTop: 10,
		background: '#FFF',
		padding: 20,
		borderRadius: 8,
		boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.15)',

		'& .ant-input-group-wrapper': {
			top: 0,
		},
	},
	dropdownInput: {
		background: '#FFF',
		height: '45px',
		'& + span': {
			background: '#FFF',
			border: 0,
		},
		'&:focus': {
			border: 0,
			outline: 0,
			boxShadow: 'none',
		},
	},
	dropdownMenu: {
		columns: 2,
		padding: 11,
		columnRule: '1px #E1E7F0 solid',
	},
	datePicker: {
		display: 'flex',
		width: '100%',
		border: '2px solid #EBF0F6',

		'& .ant-calendar-picker-icon': {
			width: '22px',
			height: '22px',
			right: '12px',
			top: '50%',
			marginTop: '-11px',
			'&:after': {
				fontSize: '22px',
			},
		},
		'& input': {
			height: 45,
			backgroundColor: '#FFF',
			'&:focus': {
				border: 0,
				outline: 0,
				boxShadow: 'none',
			},
		},
	},
	btnSearch: {
		height: '35px',
		display: 'block',
		marginRight: 0,
		marginLeft: 'auto',
		marginTop: 20,
	},
	borderBottom: {
		borderBottom: '1px solid #E1E7F0',
		marginBottom: 10,
	},
	firstChild: {
	},
	icon: {
		'&:after': {
			content: '""',
			width: '100%',
			height: 2,
			display: 'block',
			background: '#B9C0C4',
			marginTop: 4,
		},
	},
	select: {
		backgroundColor: '#FFF',
		border: '2px solid #EBF0F6',
		borderRadius: 4,
		marginBottom: 10,

		'& .ant-select-selection': {
			backgroundColor: '#FFF',
			height: 40,
			'&:focus': {
				border: 0,
				outline: 0,
				boxShadow: 'none',
			},
		},
		'& .ant-select-selection__rendered': {
			lineHeight: '40px',
		},
	},
	floatingLabel: {
		// paddingLeft: 10,
		marginBottom: 4,
		fontSize: 12,
		fontWeight: 500,
		color: '#7D8DAD',
	},
});

function mapStateToProps(state) {
	return {
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
@Form.create()
@injectIntl
export default class SearchBar extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		form: PropTypes.shape({
			validateFields: PropTypes.func,
			setFieldsValue: PropTypes.func,
		}).isRequired,
		onSearch: PropTypes.func,
		intl: intlShape.isRequired,
	}

	static defaultProps = {
		onSearch: f => f,
	}

	state = {
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { formatMessage } = this.props.intl;

		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { startDate, endDate, departure, destination, flightType } = values;
				const filter = {};

				if (departure) {
					filter['trip.departure'] = departure;
				}

				if (destination) {
					filter['trip.destination'] = destination;
				}

				if (departure && destination && departure === destination) {
					notification.error({
						message: formatMessage({ id: 'error' }),
						description: formatMessage({ id: 'departure_destination_not_equal' }),
					});
					return;
				}

				if (startDate) {
					filter['trip.startDate'] = {
						gte: moment(startDate).startOf('day'),
						lte: moment(startDate).endOf('day'),
					};
				}

				if (flightType) {
					filter.flightType = flightType;

					if (endDate) {
						filter['tripBack.startDate'] = {
							gte: moment(endDate).startOf('day'),
							lte: moment(endDate).endOf('day'),
						};
					}
				}

				if (startDate && endDate && startDate.isAfter(endDate)) {
					notification.error({
						message: formatMessage({ id: 'error' }),
						description: formatMessage({ id: 'startDate_before_endDate' }),
					});
					return;
				}

				this.props.onSearch(filter);
			}
		});
	}

	_handleDepartureChange = (value) => {
		this.props.form.setFieldsValue({ departure: value.key });
	}

	_handleDestinationChange = (value) => {
		this.props.form.setFieldsValue({ destination: value.key });
	}

	render() {
		const { form: { getFieldDecorator }, classes, intl: { formatMessage } } = this.props;

		return (
			<Form onSubmit={this.handleSubmit} className={classes.formWrapper}>
				<Row className={classes.root} type="flex">
					<Col span={24}>
						<div className={classes.floatingLabel}>{formatMessage({ id: 'departure' })}</div>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('departure')(
								<Select className={classes.select} placeholder={formatMessage({ id: 'departure' })}>
									{locationOptions.map(location => <Select.Option value={location.value}>{location.label}</Select.Option>)}
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<div className={classes.floatingLabel}>{formatMessage({ id: 'destination' })}</div>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('destination')(
								<Select className={classes.select} placeholder={formatMessage({ id: 'destination' })}>
									{locationOptions.map(location => <Select.Option value={location.value}>{location.label}</Select.Option>)}
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('flightType', {
								// initialValue: 'all',
							})(
								<Radio.Group>
									<Radio value="oneWay">{formatMessage({ id: 'one_way' })}</Radio>
									<Radio value="roundTrip">{formatMessage({ id: 'round_trip' })}</Radio>
								</Radio.Group>,
							)}
						</Form.Item>
					</Col>
					<Col span={12}>
						<div className={classes.floatingLabel}>{formatMessage({ id: 'time' })}</div>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('startDate')(
								<DatePicker
									className={classes.datePicker}
									size="large"
									placeholder={formatMessage({ id: 'start_date' })}
									format="DD/MM/YYYY"
								/>,
							)}

						</Form.Item>

					</Col>
					<Col span={12}>
						<div className={classes.floatingLabel}>&nbsp;</div>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('endDate')(
								<DatePicker
									className={classes.datePicker}
									style={{ borderLeft: 0 }}
									size="large"
									placeholder={formatMessage({ id: 'end_date' })}
									format="DD/MM/YYYY"
								/>,
							)}
						</Form.Item>
					</Col>

					<Col span={24}>
						<Button type="primary" className={classes.btnSearch} htmlType="submit" size="large">{formatMessage({ id: 'search' })}</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}
