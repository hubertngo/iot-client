

/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-01 08:38:29
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

const IconMedal = (props) => {
	const { size, color } = props;
	return (
		<svg x="0px" y="0px" width={size} height={size} viewBox="-241 1154 512 512" enableBackground="new -241 1154 512 512" space="preserve">
			<g id="Canvas" transform="translate(-5217 774)">
				<g id="medal">
					<path id="path0_fill" fill={color} d="M5232.002,464.991c64.921,0,117.759,51.589,117.759,115        c0,63.41-52.838,115.009-117.759,115.009c-64.93,0-117.762-51.6-117.762-115.009        C5114.24,516.58,5167.072,464.991,5232.002,464.991z M5245.761,627.18l44.32-42.838l-21.618-21.321l-22.54,21.782        l-50.292-49.382l-21.781,21.149L5245.761,627.18z" />
					<path id="path1_fill" fill={color} d="M5046.65,540.791c5.359-4.151,7.279-11.132,4.76-17.33        c-5.578-13.719-4.91-29.689,3.229-43.46s21.972-22.32,36.921-24.46c6.759-0.97,12-6.079,12.99-12.688        c2.198-14.589,10.951-28.111,25.049-36.051c14.101-7.96,30.461-8.6,44.5-3.16c6.352,2.46,13.5,0.59,17.74-4.64        c9.381-11.57,23.881-19,40.162-19c16.277,0,30.777,7.43,40.158,19c4.238,5.23,11.4,7.1,17.738,4.64        c14.044-5.44,30.402-4.801,44.5,3.16c14.104,7.94,22.841,21.462,25.044,36.051c1,6.609,6.236,11.719,13,12.688        c14.956,2.14,28.778,10.689,36.917,24.46c8.143,13.771,8.802,29.742,3.241,43.46c-2.519,6.198-0.599,13.179,4.759,17.33        c11.841,9.149,19.44,23.31,19.44,39.209s-7.6,30.06-19.44,39.209c-5.357,4.151-7.277,11.133-4.759,17.331        c5.561,13.723,4.901,29.698-3.241,43.46c-8.139,13.762-21.961,22.321-36.917,24.46c-6.764,0.979-12,6.08-13,12.699        c-2.203,14.603-10.94,28.104-25.044,36.039c-14.098,7.961-30.456,8.604-44.5,3.162c-6.338-2.461-13.5-0.599-17.738,4.64        c-9.381,11.579-23.881,19-40.158,19c-16.281,0-30.781-7.421-40.162-19c-4.24-5.238-11.389-7.101-17.74-4.64        c-14.039,5.441-30.399,4.799-44.5-3.162c-14.098-7.936-22.851-21.457-25.049-36.039c-0.99-6.619-6.231-11.72-12.99-12.699        c-14.949-2.139-28.781-10.698-36.921-24.46s-8.808-29.762-3.229-43.46c2.52-6.198,0.6-13.189-4.76-17.331        c-11.852-9.149-19.45-23.309-19.45-39.209S5034.799,549.939,5046.65,540.791z M5232.002,725        c81.878,0,148.479-65.039,148.479-145c0-79.951-66.602-145-148.479-145c-81.871,0-148.481,65.049-148.481,145        C5083.521,659.961,5150.131,725,5232.002,725z" />
					<path id="path2_fill" fill={color} d="M5175.061,787.521c15.188,14.399,35.421,22.479,56.941,22.479        c21.519,0,41.759-8.079,56.939-22.479c13.338,3.28,27.18,3.197,40.338-0.161V892h-28.259l-69.019-24.079L5162.981,892h-28.261        V787.36C5147.889,790.719,5161.709,790.802,5175.061,787.521z" />
				</g>
			</g>
		</svg>
	);
};

IconMedal.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
};

IconMedal.defaultProps = {
	size: 22,
	color: '#4368C4',
};

export default IconMedal;
