/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 00:50:05
*------------------------------------------------------- */

import warning from 'warning';
import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

function getStylesCreator(stylesOrCreator) {
	const themingEnabled = typeof stylesOrCreator === 'function';

	function create(theme, name) {
		const styles = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;

		if (!theme.overrides || !name || !theme.overrides[name]) {
			return styles;
		}

		const overrides = theme.overrides[name];
		const stylesWithOverrides = { ...styles };

		Object.keys(overrides).forEach(key => {
			warning(
				stylesWithOverrides[key],
				[
					'DucTien Theme: you are trying to override a style that does not exist.',
					`Fix the \`${key}\` key of \`theme.overrides.${name}\`.`,
				].join('\n'),
			);
			stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key], overrides[key]);
		});

		return stylesWithOverrides;
	}

	return {
		create,
		options: {},
		themingEnabled,
	};
}

export default getStylesCreator;
