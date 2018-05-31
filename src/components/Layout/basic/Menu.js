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
import { Menu, Button, Row, Col, Tree, Modal, Table } from 'antd';
// Styles
import withStyles from 'src/theme/jss/withStyles';

// Actions
import { toggleLoginModal } from 'src/redux/actions/modal';
import { updateLanguage } from 'src/redux/actions/lang';
import { editProfile } from 'src/redux/actions/auth';
import { getSensorList, selectSensors, Analysis } from 'src/redux/actions/sensor';
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
			analysis: state.getIn(['sensor', 'analysis']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			Analysis,
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
			Analysis: PropTypes.func,
		}).isRequired,
	}

	state = {
		expandedKeys: ['10'],
		autoExpandParent: true,
		checkedKeys: [],
		selectedKeys: [],
		visible: false,
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
	showModal = () => {
		this.setState({
			visible: true,
		});
		this.props.action.Analysis();
	}
	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
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

	columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',

		}, {
			title: 'RMS',
			dataIndex: 'rms',
			key: 'rms',
		}, {
			title: 'Max',
			dataIndex: 'max',
			key: 'max',
		}, {
			title: 'Min',
			dataIndex: 'min',
			key: 'min',
		}, {
			title: 'Average',
			dataIndex: 'average',
			key: 'average',
		},
	]

	render() {
		const { analysis } = this.props.store;

		return (
			<div>
				<Row>
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
				</Row>
				<Row type="flex" align="middle">
					<Col>
						<div style={{ marginLeft: '30px', marginTop: '100px', }}>

							<Button type="primary" onClick={this.showModal}> Analysis </Button>
							<Modal
								title="Analysis Table"
								width={800}
								visible={this.state.visible}
								footer={[
									<Button key="back" type="primary" onClick={this.handleOk}>Ok</Button>,
								]}
							>
								<Table
									dataSource={analysis.result}
									pagination={false}
									columns={this.columns}
									loading={analysis.loading}
								/>
							</Modal>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}


