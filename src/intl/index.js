/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:21
*------------------------------------------------------- */
import React, { PureComponent, Fragment } from 'react';
import { LocaleProvider } from 'antd';

import { IntlProvider } from 'react-intl';
import enUS from 'antd/lib/locale-provider/en_US';
import viVN from 'antd/lib/locale-provider/vi_VN';
import 'moment/locale/fr';
import 'moment/locale/vi';
import vi from 'src/lang/vi.json';
import en from 'src/lang/en.json';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		store: {
			auth: state.get('auth').toJS(),
			lang: state.get('lang'),
		},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const withIntl = (Child) => {
	class WrappedComponent extends PureComponent {
		static propTypes = {
		}

		state = {}

		render() {
			console.log('this.props.', this.props);
			return (
				<LocaleProvider locale={viVN}>
					<IntlProvider locale="en" messages={vi}>
						<Child />
					</IntlProvider>
				</LocaleProvider>
			);
		}
	}

	// return WrappedComponent;
	return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withIntl;
