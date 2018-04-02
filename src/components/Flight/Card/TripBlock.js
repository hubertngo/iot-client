/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-04-02 15:50:11
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Row, Col } from 'antd';

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
		justifyContent: 'center',
	},
});

const TripBlock = ({ tripData, style, classes, loading }) => {
	if (!tripData && !loading) {
		return null;
	}
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
			</div>
		);
	}

	return (
		<div style={style}>
			<Row type="flex" justify="center" style={{ marginBottom: 20 }}>
				<Col span={10}>
					<div className={classes.location}>{tripData.departure}</div>
					<span className={classes.date}>{moment(tripData.startDate).format('DD/MM/YYYY hh:mm')}</span>
				</Col>
				<Col span={4} className={classes.iconFlight}>
					<IconDeparture color="#4368C4" />
				</Col>
				<Col span={10} className="text-right">
					<div className={classes.location}>{tripData.destination}</div>
					<span>&nbsp;</span>
				</Col>
			</Row>
		</div>
	);
};

TripBlock.propTypes = {
	tripData: PropTypes.object,
	classes: PropTypes.object.isRequired,
	style: PropTypes.object,
	loading: PropTypes.bool,
};

TripBlock.defaultProps = {
	style: {},
	tripData: undefined,
	loading: false,
};

export default withStyles(styleSheet)(TripBlock);
