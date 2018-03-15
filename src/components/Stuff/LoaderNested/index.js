/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-13 17:30:56
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

const LoaderNested = (props) => {
	const { loading, size } = props;

	return !loading ? null : (
		<div
			style={{
				position: 'absolute',
				top: '0',
				right: '0',
				bottom: '0',
				left: '0',
				background: '#fff',
				zIndex: '9',
				textAlign: 'center',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Spin size={size} />
		</div>
	);
};

LoaderNested.propTypes = {
	loading: PropTypes.bool.isRequired,
	size: PropTypes.number,
};

LoaderNested.defaultProps = {
	size: 50,
};

export default LoaderNested;
