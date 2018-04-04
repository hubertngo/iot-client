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

import { Input, Menu, Dropdown, Select, Form, DatePicker, Button, Row, Col } from 'antd';

import IconDeparture from 'src/components/Photo/IconDeparture';
import IconDestination from 'src/components/Photo/IconDestination';

import withStyles from 'src/theme/jss/withStyles';

import { locationOptions } from 'src/constants/selectOption';

import moment from 'moment';

const styleSheet = (theme) => ({
	root: {
		marginTop: 20,
		marginBottom: 20,
		background: '#FFF',
		borderRadius: 30,

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
		borderRadius: '0px 30px 30px 0px',
		width: '100%',
	},
	borderRight: {
		borderRight: '1px solid #E1E7F0',
	},
	firstChild: {
		paddingLeft: 20,
		borderRadius: '30px 0 0 30px !important',
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
		onSearch: PropTypes.func.isRequired,
	}

	static defaultProps = {}

	state = {
	}

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				const filter = { ...values };

				if (filter.startDate) {
					filter.startDate = {
						gte: moment(filter.startDate).startOf('day'),
						lte: moment(filter.startDate).endOf('day'),
					};
				}

				if (filter.endDate) {
					filter.endDate = {
						gte: moment(filter.endDate).startOf('day'),
						lte: moment(filter.endDate).endOf('day'),
					};
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
			<Form onSubmit={this.handleSubmit}>
				<Row className={classes.root} type="flex">
					<Col span={5} className={classes.borderRight}>
						<Dropdown overlay={menuDeparture} trigger={['click']}>
							<div>
								<Form.Item style={{ marginBottom: 0 }}>
									{getFieldDecorator('departure')(
										<Input
											addonAfter={<IconDeparture extended />}
											className={[classes.dropdownInput, classes.firstChild]}
											size="large"
											placeholder="Nơi xuất phát"
										/>,
									)}
								</Form.Item>
							</div>
						</Dropdown>
					</Col>
					<Col span={5} className={classes.borderRight}>
						<Dropdown overlay={menuDestination} trigger={['click']} >
							<div>
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
					<Col span={4} className={classes.borderRight}>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('startDate')(
								<DatePicker
									className={classes.datePicker}
									size="large"
									placeholder="Thời gian đi"
								/>,
							)}

						</Form.Item>

					</Col>
					<Col span={4} className={classes.borderRight}>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('endDate')(
								<DatePicker
									className={classes.datePicker}
									size="large"
									placeholder="Thời gian đến"
								/>,
							)}
						</Form.Item>
					</Col>
					<Col span={3}>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('type', {
								// initialValue: 'all',
							})(
								<Select size="large" className={classes.select} placeholder="Loại vé">
									<Select.Option value="all">Tất cả</Select.Option>
									<Select.Option value="One way">Một chiều</Select.Option>
									<Select.Option value="Round trip">Hai chiều</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col span={3}>
						<Button type="secondary" className={classes.btnSearch} htmlType="submit" size="large">Search</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}
