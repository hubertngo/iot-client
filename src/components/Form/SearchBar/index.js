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
import getAirport from 'src/utils/getAirport';

import { Input, Select, Form, Button, Row, Col, notification, AutoComplete } from 'antd';

import IconDeparture from 'src/components/Photo/IconDeparture';
import IconDestination from 'src/components/Photo/IconDestination';

import withStyles from 'src/theme/jss/withStyles';
import { injectIntl, intlShape } from 'react-intl';

// import { locationOptions } from 'src/constants/selectOption';
import DatePicker from 'src/components/DatePickerLunar';
import moment from 'moment';

const styleSheet = (/* theme */) => ({
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

		'& .ant-input': {
			background: '#FFF !important',
			height: '45px !important',
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
	inputNoStyle: {
		'& input': {
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
		width: '101%',
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
		destinationSource: [],
		departureSource: [],
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
						message: formatMessage({ id: 'required' }),
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
		getAirport(query).then(source => {
			this.setState({ [stateName]: source });
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
		// console.log('áđâsdá', this.state);
		// const menuDeparture = (
		// 	<Menu className={classes.dropdownMenu} onClick={this._handleDepartureChange}>
		// 		{this.state.departureSource.map(location => <Menu.Item key={location}>{location}</Menu.Item>)}
		// 	</Menu>
		// );
		// const menuDestination = (
		// 	<Menu className={classes.dropdownMenu} onClick={this._handleDestinationChange}>
		// 		{this.state.destinationSource.map(location => <Menu.Item key={location}>{location}</Menu.Item>)}
		// 	</Menu>
		// );

		return (
			<Form onSubmit={this.handleSubmit}>
				<Row className={classes.root} type="flex">
					<Col span={5} className={classes.borderRight}>

						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('departure')(
								<AutoComplete
									dataSource={this.state.departureSource}
									style={{ width: '100%' }}
									size="large"
									className={classes.dropdownInput + ' ' + classes.firstChild}
									onSearch={this.handleSearchDeparture}
								>
									<Input className={classes.inputNoStyle} size="large" suffix={<IconDeparture extended />} placeholder={formatMessage({ id: 'departure' })} />
								</AutoComplete>,
							)}
						</Form.Item>

					</Col>
					<Col span={5} className={classes.borderRight}>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('destination')(
								<AutoComplete
									dataSource={this.state.destinationSource}
									style={{ width: '100%' }}
									size="large"
									className={classes.dropdownInput}
									onSearch={this.handleSearchDestination}
								>
									<Input className={classes.inputNoStyle} size="large" suffix={<IconDestination extended />} placeholder={formatMessage({ id: 'destination' })} />
								</AutoComplete>,
							)}
						</Form.Item>
					</Col>
					<Col span={4} className={classes.borderRight}>
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
					<Col span={4} className={classes.borderRight}>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('endDate')(
								<DatePicker
									className={classes.datePicker}
									size="large"
									placeholder={formatMessage({ id: 'end_date' })}
									format="DD/MM/YYYY"
								/>,
							)}
						</Form.Item>
					</Col>
					<Col span={3}>
						<Form.Item style={{ marginBottom: 0 }}>
							{getFieldDecorator('flightType', {
								// initialValue: 'all',
							})(
								<Select size="large" className={classes.select} placeholder={formatMessage({ id: 'ticket_type' })}>
									<Select.Option value={null}>{formatMessage({ id: 'all' })}</Select.Option>
									<Select.Option value="oneWay">{formatMessage({ id: 'one_way' })}</Select.Option>
									<Select.Option value="roundTrip">{formatMessage({ id: 'round_trip' })}</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col span={3}>
						<Button type="secondary" className={classes.btnSearch} htmlType="submit" size="large">{formatMessage({ id: 'search_ticket' })}</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}
