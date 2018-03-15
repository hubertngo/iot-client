/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-01 08:38:29
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import initials from 'initials';

import { Icon } from 'antd';

import withStyles from 'src/theme/jss/withStyles';

const defaultColors = [
	'#2ecc71', // emerald
	'#3498db', // peter river
	'#8e44ad', // wisteria
	'#e67e22', // carrot
	'#e74c3c', // alizarin
	'#1abc9c', // turquoise
	'#2c3e50', // midnight blue
];

function sumChars(str) {
	let sum = 0;
	for (let i = 0; i < str.length; i++) {
		sum += str.charCodeAt(i);
	}

	return sum;
}

const styleSheet = (/* theme */) => ({
	inner: {
		boxSizing: 'border-box',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid #e8e8e8',
		color: '#fff',
		background: '#fff',
	},
});


const Avatar = (props) => {
	const { classes, borderRadius, src, srcset, name, color, colors, size, style, onClick, className } = props;

	const abbr = initials(name);

	const imageStyle = {
		display: 'block',
		width: size + 'px',
		height: size + 'px',
		borderRadius,
	};

	const innerStyle = {
		width: size + 'px',
		height: size + 'px',
		borderRadius,
		fontSize: size * 0.4,
	};

	let inner;

	if (src || srcset) {
		inner = <img style={imageStyle} src={src} srcSet={srcset} alt={name} />;
	} else if (name) {
		let background;
		if (color) {
			background = color;
		} else {
			// pick a deterministic color from the list
			const i = sumChars(name) % colors.length;
			background = colors[i];
		}

		innerStyle.backgroundColor = background;

		inner = abbr;
	} else {
		innerStyle.backgroundColor = '#ccc';
		innerStyle.fontSize = size * 0.5;

		inner = <Icon type="user" />;
	}

	return (
		<div aria-label={name} className={classes.inner + ' ' + className} style={{ ...innerStyle, ...style }} onClick={onClick}>
			{inner}
		</div>
	);
};

Avatar.propTypes = {
	classes: PropTypes.object.isRequired,
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func,
	name: PropTypes.string,
	borderRadius: PropTypes.string,
	src: PropTypes.string,
	srcset: PropTypes.string,
	color: PropTypes.string,
	colors: PropTypes.array,
	size: PropTypes.number,
};

Avatar.defaultProps = {
	borderRadius: '100%',
	style: {},
	className: '',
	onClick: f => f,
	src: undefined,
	srcset: undefined,
	color: undefined,
	colors: defaultColors,
	size: 32,
	name: '',
};

export default withStyles(styleSheet)(Avatar);
