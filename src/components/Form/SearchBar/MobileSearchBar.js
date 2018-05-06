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
		marginTop: 20,
		background: '#FFF',
		padding: 15,
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
		height: '45px',
		display: 'block',
		marginRight: 0,
		marginLeft: 'auto',
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
		'& .ant-select-selection': {
			backgroundColor: '#FFF',
			height: 45,
			'&:focus': {
				border: 0,
				outline: 0,
				boxShadow: 'none',
			},
		},
		'& .ant-select-selection__rendered': {
			lineHeight: '45px',
		},
	},
	floatingLabel: {
		paddingLeft: 10,
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
export default class SearchBar extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		form: PropTypes.shape({
			validateFields: PropTypes.func,
			setFieldsValue: PropTypes.func,
		}).isRequired,
		onSearch: PropTypes.func,
	}

	static defaultProps = {
		onSearch: f => f,
	}

	state = {
	}

	handleSubmit = (e) => {
		e.preventDefault();

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
						message: 'Lỗi',
						description: 'Vui lòng nhập điểm xuất phát và điểm đến khác nhau',
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
						message: 'Lỗi',
						description: 'Vui lòng nhập ngày đi trước ngày về',
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
		const { form: { getFieldDecorator }, classes } = this.props;
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
			<Form onSubmit={this.handleSubmit} className={classes.formWrapper}>
				<Row className={classes.root} type="flex">
					<Col span={24} className={classes.borderBottom}>
						<Dropdown overlay={menuDeparture} trigger={['click']}>
							<div>
								<div className={classes.floatingLabel}>Xuất phát</div>
								<Form.Item style={{ marginBottom: 0 }}>
									{getFieldDecorator('departure')(
										<Input
											addonAfter={<IconDeparture extended />}
											className={classes.dropdownInput + ' ' + classes.firstChild}
											size="large"
											placeholder="Nơi xuất phát"
										/>,
									)}
								</Form.Item>
							</div>
						</Dropdown>
					</Col>
					<Col span={24} className={classes.borderBottom}>
						<Dropdown overlay={menuDestination} trigger={['click']} >
							<div>
								<div className={classes.floatingLabel}>Điểm đến</div>
								<Form.Item style={{ marginBottom: 0 }}>
									{getFieldDecorator('destination')(
										<Input
											addonAfter={<IconDestination extended />}
											className={classes.dropdownInput}
											size="large"
											placeholder="Nơi đến"
										/>,
									)}
								</Form.Item>
							</div>
						</Dropdown>
					</Col>
					<Col span={24} className={classes.borderBottom}>
						<div className={classes.floatingLabel}>Loại vé</div>
						<Form.Item style={{ marginBottom: 0, paddingLeft: 10 }}>
							{getFieldDecorator('flightType', {
								// initialValue: 'all',
							})(
								<Radio.Group>
									<Radio value="oneWay">Một chiều</Radio>
									<Radio value="roundTrip">Hai chiều</Radio>
								</Radio.Group>,
							)}
						</Form.Item>
					</Col>
					<Col span={12} className={classes.borderBottom}>
						<div className={classes.floatingLabel}>Thời gian</div>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('startDate')(
								<DatePicker
									className={classes.datePicker}
									size="large"
									placeholder="Thời gian đi"
									format="DD/MM/YYYY"
								/>,
							)}

						</Form.Item>

					</Col>
					<Col span={12} className={classes.borderBottom}>
						<div>&nbsp;</div>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('endDate')(
								<DatePicker
									className={classes.datePicker}
									size="large"
									placeholder="Thời gian đến"
									format="DD/MM/YYYY"
								/>,
							)}
						</Form.Item>
					</Col>

					<Col span={24}>
						<Button type="primary" className={classes.btnSearch} htmlType="submit" size="large">Tìm kiếm</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}
