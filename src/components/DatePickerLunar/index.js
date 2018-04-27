import React, { Component } from 'react';
import { DatePicker } from 'antd';
import converter from 'src/utils/lunarSolarConverter';

export default class DatePickerLunar extends Component {
	state = {}

	dateRender = (current) => {
		const { lunarMonth, lunarDay } = converter.SolarToLunar({
			solarYear: current.year(),
			solarMonth: current.month() + 1,
			solarDay: current.date(),
		});

		return (
			<div className="ant-calendar-date">
				<div className="text-left">{current.date()}</div>
				<div className="text-right" style={{ lineHeight: 1.5, fontSize: 10, color: 'blue' }}>{lunarDay === 1 ? `${lunarDay}/${lunarMonth}` : lunarDay}</div>
			</div>
		);
	}

	render() {
		return (
			<DatePicker
				{...this.props}
				dateRender={this.dateRender}
			/>
		);
	}
}
