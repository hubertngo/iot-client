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
				<g transform="translate(0 2370)">
					<path fill={color} d="M-531.138-366.375h478.712v58.875h-478.712V-366.375z M-34.5-640.3       c-5.125-23.05-25.6-38.4-46.075-30.725L-213.7-630.05L-390.338-819.5l-48.637,15.351l104.95,209.925l-125.438,38.399       l-51.2-43.524L-546.5-589.1l46.075,92.149l20.488,38.4l40.962-12.8l133.112-40.95l110.087-33.275L-62.65-586.55       C-42.175-594.225-29.375-617.25-34.5-640.3z" />
				</g>
			</svg>
		);
	}

	return (
		<svg x="0px" y="0px" width={size} height={size} viewBox="-546.5 1550.5 512 512" enableBackground="new -546.5 1550.5 512 512" space="preserve">
			<g transform="translate(0 2370)">
				<path fill={color} d="M-35.065-564.775c-5.125-23.049-25.601-38.4-46.075-30.725l-133.125,40.975      l-176.638-189.449l-48.637,15.35l104.95,209.926l-125.438,38.398l-51.2-43.523l-35.837,10.25l46.075,92.148l20.488,38.4      l40.962-12.799l133.112-40.951l110.087-33.275l133.125-40.975C-42.74-518.699-29.94-541.725-35.065-564.775z" />
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
