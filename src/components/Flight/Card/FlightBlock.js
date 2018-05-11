import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col, Tag } from 'antd';

import { flightOptions } from 'src/constants/selectOption';
import { getLabel } from 'src/utils';

import IconDeparture from 'src/components/Photo/IconDeparture';

import withStyles from 'src/theme/jss/withStyles';

const styleSheet = (theme) => ({
	location: {
		fontSize: 14,
		textTransform: 'uppercase',
		fontWeight: 600,
	},
	date: {
		color: theme.palette.text.disabled,
		fontWeight: 500,
		fontSize: 12,
	},
	iconFlight: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const FlightBlock = ({ flightData, style, classes, loading, intl: { formatMessage } }) => {
	const { trip } = flightData;

	if (loading) {
		return (
			<div style={style}>
				<Row type="flex" justify="center" style={{ marginBottom: 10 }}>
					<Col span={10}>
						<div className="loading-block" />
						<div className="loading-block" />
					</Col>
					<Col span={4} className="text-center">
						<IconDeparture color="#4368C4" />
					</Col>
					<Col span={10} className="text-right">
						<div className="loading-block" />
					</Col>
				</Row>
				<Row type="flex">
					<Col span={12} style={{ display: 'flex', width: '100%' }}>
						<div className="loading-block" />
						<div className="loading-block" />
					</Col>
				</Row>
			</div>
		);
	}

	return (
		<div style={style}>
			<Row type="flex" justify="center" style={{ marginBottom: 20 }}>
				<Col span={10}>
					<div className={classes.location}>{trip.departure}</div>
					<span className={classes.date}>{moment(trip.startDate).format('DD/MM/YYYY hh:mm')}</span>
				</Col>
				<Col span={4} className={classes.iconFlight}>
					<IconDeparture color="#4368C4" />
				</Col>
				<Col span={10} className="text-right">
					<div className={classes.location}>{trip.destination}</div>
					<span>&nbsp;</span>
				</Col>
			</Row>
			<Row type="flex">
				<Col span={12} style={{ display: 'flex' }}>
					{
						getLabel(flightData.airline, flightOptions).value === 'all' ? (
							<Fragment>
								<IconDeparture size={18} extended />
								<span className={classes.note} style={{ marginLeft: 10 }}>{formatMessage({ id: 'all_airline' })}</span>
							</Fragment>
						) : (
							<img src={getLabel(flightData.airline, flightOptions).logo} alt="" height={18} />
						)
					}
				</Col>
				<Col span={12} className="text-right">
					<Tag color="#95A2AB">{flightData.seatType}</Tag>
					<Tag style={{ marginRight: 0, color: '#95A2AB' }} color="#EAEAEA">{flightData.packageWeight}Kg</Tag>
				</Col>
			</Row>
		</div>
	);
};

FlightBlock.propTypes = {
	flightData: PropTypes.object,
	classes: PropTypes.object.isRequired,
	style: PropTypes.object,
	loading: PropTypes.bool,
	intl: intlShape.isRequired,
};

FlightBlock.defaultProps = {
	style: {},
	flightData: {},
	loading: false,
};

export default withStyles(styleSheet)(injectIntl(FlightBlock));
