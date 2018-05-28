/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 14:39:16
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { injectIntl, intlShape } from 'react-intl';
import { Menu, Checkbox, Row, Col } from 'antd';
// Styles
import withStyles from 'src/theme/jss/withStyles';

// Actions
import { toggleLoginModal } from 'src/redux/actions/modal';
import { updateLanguage } from 'src/redux/actions/lang';
import { editProfile } from 'src/redux/actions/auth';
import { getSensorList, selectSensors } from 'src/redux/actions/sensor';
// Store
import AuthStorage from 'src/utils/AuthStorage';

// Components
const SubMenu = Menu.SubMenu;
const styleSheet = (theme) => ({
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
			lang: state.get('lang'),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleLoginModal,
			updateLanguage,
			selectSensors,
			getSensorList,
		}, dispatch),
	};
};

@withRouter
@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
export default class MenuComponent extends Component {
	static propTypes = {
		// action
		action: PropTypes.shape({
			getSensorList: PropTypes.func,
			selectSensors: PropTypes.func,
		}).isRequired,
	}

	componentWillMount = () => {
		this.props.action.getSensorList({
			filter: {
				include: 'SensorValues',
			},
			firstLoad: true,
		});
	};

	onChange = (checkedValues) => {
		this.props.action.selectSensors(checkedValues);
	}

	render() {
		return (
			<Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
				<Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" style={{ color: '#fff' }}>
					<SubMenu
						key="sub1"
						title={<span style={{ color: '#000000' }}>Sensor</span>}
					>
						<Menu.Item key="1">
							<Checkbox value={0}>sensor5</Checkbox>
						</Menu.Item>
						<Menu.Item key="2">
							<Checkbox value={1}>sensor4</Checkbox>
						</Menu.Item>
						<Menu.Item key="3">
							<Checkbox value={2}>sensor3</Checkbox>
						</Menu.Item>
						<Menu.Item key="4">
							<Checkbox value={3}>sensor2</Checkbox>
						</Menu.Item>
						<Menu.Item key="5">
							<Checkbox value={4}>sensor1</Checkbox>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Checkbox.Group>
		);
	}
}

