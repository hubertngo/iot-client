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
import { Menu, Checkbox, Row, Col, Tree } from 'antd';
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
const TreeNode = Tree.TreeNode;
const SubMenu = Menu.SubMenu;
const styleSheet = (theme) => ({
});


const treeData = [{
	title: 'Sensor',
	key: '10',
	children: [
		{ title: 'sensor1', key: 3 },
		{ title: 'sensor2', key: 4 },
		{ title: 'sensor3', key: 2 },
		{ title: 'sensor4', key: 1 },
		{ title: 'sensor5', key: 0 },
	],
},
];


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

	state = {
		expandedKeys: ['10'],
		autoExpandParent: true,
		checkedKeys: [],
		selectedKeys: [],
	}

	componentWillMount = () => {
		this.props.action.getSensorList({
			filter: {
				include: {
					relation: 'SensorValues',
					scope: {
						limit: 100,
					},
				},
			},
			firstLoad: true,
		});
	};

	onChange = (checkedValues) => {
		this.props.action.selectSensors(checkedValues);
	}

	onCheck = (checkedKeys) => {
		this.props.action.selectSensors(checkedKeys);
		this.setState({ checkedKeys });
	}
	onSelect = (selectedKeys, info) => {
		console.log('onSelect', info.node.props.title);
		this.setState({ selectedKeys });
	}
	renderTreeNodes = (data) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<TreeNode title={item.title} key={item.key} dataRef={item}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode {...item} />;
		});
	}

	render() {
		return (
			<Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
				<Tree
					showLine
					checkable
					expandedKeys={this.state.expandedKeys}
					autoExpandParent={this.state.autoExpandParent}
					onCheck={this.onCheck}
					checkedKeys={this.state.checkedKeys}
					onSelect={this.onSelect}
					selectedKeys={this.state.selectedKeys}
				>
					{this.renderTreeNodes(treeData)}
				</Tree>
			</Checkbox.Group>
		);
	}
}


