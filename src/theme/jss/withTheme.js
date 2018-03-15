/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 00:50:55
*------------------------------------------------------- */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createTheme from './createTheme';
import themeListener from './themeListener';

let defaultTheme;

function getDefaultTheme() {
	if (defaultTheme) {
		return defaultTheme;
	}

	defaultTheme = createTheme();
	return defaultTheme;
}

// Provide the theme object as a property to the input component.
const withTheme = () => Component => {
	class WithTheme extends React.Component {
		constructor(props, context) {
			super(props, context);
			this.state = {
				// We use || as the function call is lazy evaluated.
				theme: themeListener.initial(context) || getDefaultTheme(),
			};
		}

		state = {};

		componentDidMount() {
			this.unsubscribeId = themeListener.subscribe(this.context, theme => {
				this.setState({ theme });
			});
		}

		componentWillUnmount() {
			if (this.unsubscribeId !== null) {
				themeListener.unsubscribe(this.context, this.unsubscribeId);
			}
		}

		unsubscribeId = null;

		render() {
			return <Component theme={this.state.theme} {...this.props} />;
		}
	}

	WithTheme.contextTypes = themeListener.contextTypes;

	if (process.env.NODE_ENV !== 'production') {
		WithTheme.displayName = wrapDisplayName(Component, 'WithTheme');
	}

	hoistNonReactStatics(WithTheme, Component);

	if (process.env.NODE_ENV !== 'production') {
		// Exposed for test purposes.
		WithTheme.Naked = Component;
	}

	return WithTheme;
};

export default withTheme;
