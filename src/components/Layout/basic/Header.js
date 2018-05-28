/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-09 17:44:33
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import withStyles from 'src/theme/jss/withStyles';
import { injectIntl, intlShape } from 'react-intl';

import Container from 'src/components/Layout/Container';
import { Icon, Button, Avatar } from 'antd';
// Store
import AuthStorage from 'src/utils/AuthStorage';

import Menu from './Menu';

const styles = (theme) => ({
	root: {
		height: '45px',

		'@media (max-width: 991.98px)': {
			height: '65px',
		},
	}
});

@withStyles(styles)
@injectIntl
export default class Header extends Component {
	static propTypes = {
	}

	state = {
		active: false,
	}

	toggleMenu = () => {
		this.setState({ active: !this.state.active });
	}

	hideMenu = () => {
		this.setState({ active: false });
	}

	render() {

		return (
			<Menu />
		);
	}
}
