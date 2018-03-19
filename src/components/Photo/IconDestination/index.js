/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-01 08:38:29
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

const IconDeparture = (props) => {
	const { size, color, extended } = props;

	if (extended) {
		return (
			<svg x="0px" y="0px" width={size} height={size} viewBox="-546.5 1550.5 512 512" enableBackground="new -546.5 1550.5 512 512" space="preserve">
				<g transform="translate(0 2280)">
					<path fill={color} d="M-546.5-271.25h512v53.75h-512V-271.25z M-351.938-424.85l117.763,30.699 l143.35,38.4c20.475,5.125,43.525-7.675,48.65-28.15c5.125-20.475-7.675-43.524-28.175-48.649L-213.7-473.5l-74.237-243.2 l-53.763-12.8v222.725l-133.125-35.85l-25.6-61.425l-38.4-10.25v138.25l43.525,12.8L-351.938-424.85z" />
				</g>
			</svg>
		);
	}

	return (
		<svg x="0px" y="0px" width={size} height={size} viewBox="-546.5 1550.5 512 512" enableBackground="new -546.5 1550.5 512 512" space="preserve">
			<g transform="translate(0 2280)">
				<path fill={color} d="M-354.274-352.942l121.126,31.576l147.444,39.498       c21.06,5.271,44.769-7.895,50.04-28.955c5.271-21.06-7.895-44.768-28.98-50.039l-147.445-42.12l-76.358-250.146l-55.298-13.166       v229.087l-136.928-36.874l-26.331-63.179l-39.497-10.543v142.199l44.769,13.165L-354.274-352.942z" />
			</g>
		</svg>
	);
};

IconDeparture.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	extended: PropTypes.bool,
};

IconDeparture.defaultProps = {
	size: 22,
	color: '#B9C0C4',
	extended: false,
};

export default IconDeparture;
