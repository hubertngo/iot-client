/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 00:50:17
*------------------------------------------------------- */

import jssGlobal from 'jss-global';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import jssDefaultUnit from 'jss-default-unit';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssPropsSort from 'jss-props-sort';

// Subset of jss-preset-default with only the plugins the Material-UI
// components are using.
function jssPreset() {
	return {
		plugins: [
			jssGlobal(),
			jssNested(),
			jssCamelCase(),
			jssDefaultUnit(),
			jssVendorPrefixer(),
			jssPropsSort(),
		],
	};
}

export default jssPreset;
