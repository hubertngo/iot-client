import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Price from 'src/components/Stuff/Price';

import withStyles from 'src/theme/jss/withStyles';

const styleSheet = () => ({
});

const BidBlock = ({ isStart, price, style, intl: { formatMessage } }) => {
	return (
		<div style={style}>
			<div>{isStart ? formatMessage({ id: 'start_price' }) : formatMessage({ id: 'current_price' })}</div>
			<p><Price price={price} type={isStart ? '' : 'primary'} /></p>
		</div>
	);
};

BidBlock.propTypes = {
	style: PropTypes.object,
	isStart: PropTypes.bool,
	price: PropTypes.number,
	intl: PropTypes.shape({
		formatMessage: PropTypes.func,
	}).isRequired,
};

BidBlock.defaultProps = {
	style: {},
	isStart: false,
	price: 1200000,
};

export default withStyles(styleSheet)(injectIntl(BidBlock));
