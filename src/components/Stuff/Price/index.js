/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-13 17:30:56
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'src/theme/jss/withStyles';

import { formatNumber } from 'src/utils';

const styleSheet = () => ({
	root: {
		fontSize: 16,
		fontWeight: 600,
	},
	default: {},
	primary: {
		color: '#EB5757',
	},
	currency: {
		marginLeft: 3,
		fontSize: 12,
	},
});

const Price = ({ price, currency, type, classes }) => {
	return (
		<span className={classes.root}>
			<span className={[classes[type]]}>{formatNumber(price)}</span>
			<span className={classes.currency}>{currency}</span>
		</span>
	);
};

Price.propTypes = {
	price: PropTypes.number,
	currency: PropTypes.string,
	classes: PropTypes.object.isRequired,
	type: PropTypes.string,
};

Price.defaultProps = {
	price: 0,
	currency: 'VNĐ',
	type: 'default',
};

export default withStyles(styleSheet)(Price);
