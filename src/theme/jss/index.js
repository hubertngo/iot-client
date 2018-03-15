/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:30
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DTThemeProvider from './DTThemeProvider';
import getPageContext from './getPageContext';

function withJss(Component) {
	class WithJss extends PureComponent {
		static propTypes = {
			pageContext: PropTypes.object,
		}

		static defaultProps = {
			pageContext: null,
		}

		static getInitialProps = ctx => {
			if (Component.getInitialProps) {
				return Component.getInitialProps(ctx);
			}

			return {};
		}

		componentWillMount() {
			this.pageContext = this.props.pageContext || getPageContext();
		}

		componentDidMount() {
			// Remove the server-side injected CSS.
			const jssStyles = document.querySelector('#jss-server-side');
			if (jssStyles && jssStyles.parentNode) {
				jssStyles.parentNode.removeChild(jssStyles);
			}
		}

		pageContext = null;

		render() {
			return (
				<DTThemeProvider
					theme={this.pageContext.theme}
					sheetsManager={this.pageContext.sheetsManager}
				>
					<Component {...this.props} />
				</DTThemeProvider>
			);
		}
	}

	return WithJss;
}

export default withJss;
