/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-13 23:05:24
*------------------------------------------------------- */
import React, { PureComponent } from 'react';
import withSize from 'react-sizes';

const withSizes = (Child) => {
	@withSize(({ width }) => {
		if (!width) {
			return {
				breakpoints: 'lg',
			};
		}
		return {
			breakpoints: width < 576 ? 'xs' : width < 768 ? 'sm' : width < 992 ? 'md' : width < 1200 ? 'lg' : 'xl',
		};
	})
	class WithSizes extends PureComponent {
		render() {
			return <Child {...this.props} />;
		}
	}

	return WithSizes;
};

export default withSizes;
