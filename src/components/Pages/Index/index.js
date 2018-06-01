/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-15 15:06:09
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import { bindActionCreators } from 'redux';
import withStyles from 'src/theme/jss/withStyles';
import { Line } from 'react-chartjs-2';
import config from 'src/constants/api';
import moment from 'moment';
import { addSensorValue } from 'src/redux/actions/sensor';

const { API_URL } = config;
const styleSheet = (theme) => ({
	root: {
	},
});

function mapStateToProps(state) {
	return {
		store: {
			sensorList: state.getIn(['sensor', 'sensorList']),
			selectedSensors: state.getIn(['sensor', 'selectedSensors']),
		},
	};
}

const mapDispatchToProps = {
	addSensorValue,
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
export default class ClassName extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			sensorList: PropTypes.object.isRequired,
			selectedSensors: PropTypes.arr,
		}).isRequired,
		addSensorValue: PropTypes.func.isRequired,
		// action
	}

	static defaultProps = {}

	componentDidMount() {
		const urlToChangeStream = API_URL + '/sensor-values/change-stream?_format=event-stream';
		const src = new EventSource(urlToChangeStream);

		src.addEventListener('data', (msg) => {
			const data = JSON.parse(msg.data);
			// const noti = data.data;
			this.props.addSensorValue(data.data);
		});
	}

	render() {
		const { classes, store } = this.props;
		console.log('store.sensorList', store.sensorList);

		if (store.sensorList.loading) {
			return null;
		}
		return (
			<div className={classes.root}>
				{!store.sensorList.loading && store.sensorList.data && store.selectedSensors.map(sensor => (
					<RenderLine key={sensor} sensor={store.sensorList.data[sensor]} />
				))
				}
				{(store.sensorList.loading || !store.sensorList.data) &&
					<Row>
						<Col span={4} offset={10} >
							<Spin size="large" />
						</Col>
					</Row>
				}
			</div>
		);
	}
}

const RenderLine = ({ sensor }) => {
	if (!sensor) return null;
	if (!sensor.SensorValues) return null;
	const labels = sensor.SensorValues.map(item => {
		return moment(item.createdAt).format('DD-MM-YYYY HH:mm');
	});
	const values = sensor.SensorValues.map(item => {
		return item.value;
	});
	const data = {
		labels,
		datasets: [
			{
				label: sensor.name,
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: values,
			}
		]
	};
	return (
		<Line data={data} height={50} />
	);
};
