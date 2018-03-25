/* --------------------------------------------------------
* Author Lê Quang Thịnh
* Email lqthinh93@gmail.com
* Phone 0937341717
*
* Created: 2018-03-21 16:11:20
*------------------------------------------------------- */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'src/theme/jss/withStyles';
import { Row, Col, Tag, Icon, Button, Menu } from 'antd';
import GroupStar from 'src/components/Flight/Card/GroupStar';
import Avatar from 'src/components/Photo/Avatar';

const styleSheet = (theme) => ({
	root: {
		background: 'white',
		marginTop: 16,
		width: '260px',
		borderRadius: 8,
		color: 'black',
		position: 'relative',
	},
	arrow: {
		width: 0,
		height: 0,
		borderLeft: '10px solid transparent',
		borderRight: '10px solid transparent',
		borderBottom: '10px solid white',
		right: 25,
		top: -10,
		position: 'absolute',
	},
	closeBtn: {
		position: 'absolute',
		right: '5px',
		top: '5px',
		fontSize: '20px',
		cursor: 'pointer',
	},
	row: {
		borderBottom: `1px solid ${theme.palette.text.divider}`,
		padding: 15,
		'& i': {
			fontWeight: 'bold',
			marginRight: 10,
		},
		cursor: 'pointer',
		'&:hover': {
			fontWeight: 'bold',
		},
	},
	rowHeader: {
		'& i': {
			marginRight: 0,
		},
	},
	rowBottom: {
		borderBottom: 'none',
	},
	author: {
		textTranform: 'uppercase',
		fontWeight: 'bold',
		maxWidth: '145px',
		wordWrap: 'break-word',
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
export default class UserDropdown extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
		}).isRequired,
	}

	render() {
		const { classes, store } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.arrow} />
				<Icon type="close-circle" className={classes.closeBtn} />
				<Row type="flex" className={`${classes.row} ${classes.rowHeader}`}>
					<Col span={6}>
						<Avatar style={{ marginBottom: 5 }} size={40} />
					</Col>
					<Col span={18} style={{ textAlign: 'left' }}>
						<div className={classes.author}> fdsafadsfadsfdsafadsfdsaf </div>
						<GroupStar rate={3} />
					</Col>
				</Row>
				<Row type="flex" className={classes.row}>
					<span> <Icon /> </span>
					<span> Lịch sử giao dịch cá nhân </span>
				</Row>
				<Row type="flex" className={classes.row}>
					<span> <Icon type="user" /> </span>
					<span> Thông tin cá nhân </span>
				</Row>
				<Row type="flex" className={classes.row}>
					<span> <Icon type="setting" /> </span>
					<span> Cài đặt </span>
				</Row>
				<Row type="flex" className={`${classes.row} ${classes.rowBottom}`}>
					<span> <Icon type="logout" /> </span>
					<span> Đăng xuất </span>
				</Row>
			</div>
		);
	}
}

UserDropdown.propTypes = {
	classes: PropTypes.object.isRequired,
};

