import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Row, Col, Tag } from 'antd';

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

const FlightBlock = ({ flight, style, classes, loading }) => {
	const { departure, destination, startDate, airline } = flight;
	const getAirlineLogo = (airlineName) => {
		switch (airlineName) {
			case 'vna':
				return '/static/assets/images/logo/logo_vna.png';
			case 'jetstar':
				return '/static/assets/images/logo/logo_jetstar.png';
			case 'vietjet':
				return '/static/assets/images/logo/logo_vietjet.png';
			default:
		}
	};

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
					<div className={classes.location}>{departure}</div>
					<span className={classes.date}>{moment(startDate).format('DD/MM/YYYY hh:mm')}</span>
				</Col>
				<Col span={4} className={classes.iconFlight}>
					<IconDeparture color="#4368C4" />
				</Col>
				<Col span={10} className="text-right">
					<div className={classes.location}>{destination}</div>
					<span>&nbsp;</span>
				</Col>
			</Row>
			<Row type="flex">
				<Col span={12} style={{ display: 'flex' }}>
					{
						!airline ? (
							<Fragment>
								<IconDeparture size={18} extended />
								<span className={classes.note} style={{ marginLeft: 5 }}>Tất cả các hãng</span>
							</Fragment>
						) : (
							<img src={getAirlineLogo(airline)} alt="" height={18} />
						)
					}
				</Col>
				<Col span={12} className="text-right">
					<Tag color="#95A2AB">Promo</Tag>
					<Tag style={{ marginRight: 0, color: '#95A2AB' }} color="#EAEAEA">7Kg</Tag>
				</Col>
			</Row>
		</div>
	);
};

FlightBlock.propTypes = {
	flight: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	style: PropTypes.object,
	loading: PropTypes.bool.isRequired,
};

FlightBlock.defaultProps = {
	style: {},
};

export default withStyles(styleSheet)(FlightBlock);
