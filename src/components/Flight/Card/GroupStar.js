import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

const GroupStar = ({ rate }) => {
	return (
		<div>
			{
				[0, 0, 0, 0, 0].map((item, index) => (
					<Icon type="star" style={{ color: rate > index ? '#FFB74D' : '#95A2AB' }} />
				))
			}
		</div>
	);
};

GroupStar.propTypes = {
	rate: PropTypes.number,
};

GroupStar.defaultProps = {
	rate: 0,
};

export default GroupStar;
