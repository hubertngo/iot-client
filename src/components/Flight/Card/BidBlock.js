import React from 'react';
import PropTypes from 'prop-types';
import Price from 'src/components/Stuff/Price';

import withStyles from 'src/theme/jss/withStyles';

const styleSheet = () => ({
});

const BidBlock = ({ isStart, price, style }) => {
	return (
		<div style={style}>
			<div>{isStart ? 'Giá khởi điểm' : 'Giá được trả'}</div>
			<p><Price price={price} type={isStart ? '' : 'primary'} /></p>
		</div>
	);
};

BidBlock.propTypes = {
	style: PropTypes.object,
	isStart: PropTypes.bool,
	price: PropTypes.number,
};

BidBlock.defaultProps = {
	style: {},
	isStart: false,
	price: 1200000,
};

export default withStyles(styleSheet)(BidBlock);
