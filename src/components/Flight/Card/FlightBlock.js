import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Tag } from 'antd';

import IconDeparture from 'src/components/Photo/IconDeparture';

import withStyles from 'src/theme/jss/withStyles';

const styleSheet = () => ({
	location: {
		fontSize: 14,
		textTransform: 'uppercase',
		fontWeight: 600,
	},
	date: {
		color: '#95A2AB',
	},
});

const getAgencyLogo = (angencyName) => {
	switch (angencyName) {
		case 'vna':
			return '/static/assets/images/logo/logo_vna.png';
		case 'jetstar':
			return '/static/assets/images/logo/logo_jetstar.png';
		case 'vietjet':
			return '/static/assets/images/logo/logo_vietjet.png';
		default:
	}
};

const FlightBlock = ({ flight, style, classes }) => {
	const { departure, destination, startDate, agency } = flight;

	return (
		<div style={style}>
			<Row type="flex" justify="center" style={{ marginBottom: 10 }}>
				<Col span={10}>
					<div className={classes.location}>{departure}</div>
					<span className={classes.date}>{startDate}</span>
				</Col>
				<Col span={4} className="text-center">
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
						!agency ? (
							<Fragment>
								<IconDeparture size={18} extended />
								<span className={classes.note} style={{ marginLeft: 5 }}>Tất cả các hãng</span>
							</Fragment>
						) : (
							<img src={getAgencyLogo(agency)} alt="" height={18} />
						)
					}
				</Col>
				<Col span={12} className="text-right">
					<Tag>Promo</Tag>
					<Tag style={{ marginRight: 0 }}>7Kg</Tag>
				</Col>
			</Row>
		</div>
	);
};

FlightBlock.propTypes = {
	flight: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	style: PropTypes.object,
};

FlightBlock.defaultProps = {
	style: {},
};

export default withStyles(styleSheet)(FlightBlock);
