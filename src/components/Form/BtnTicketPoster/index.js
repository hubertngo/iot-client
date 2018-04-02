/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-04-02 07:41:09
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Menu, Dropdown, Button } from 'antd';

import AuthStorage from 'src/utils/AuthStorage';

import withStyles from 'src/theme/jss/withStyles';

import CheckLogin from 'src/components/Form/CheckLogin';

import { toggleTicketPosterModal } from 'src/redux/actions/modal';

const styleSheet = (theme) => ({
	root: {},
	postBtn: {
		height: '30px',
		width: '80px',
	},
});

function mapStateToProps(state) {
	return {
		store: {
			// modal: state.modal,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleTicketPosterModal,
		}, dispatch),
	};
};

const BtnTicketPoster = (props) => {
	const { classes, children, action } = props;

	const handleMenuClick = (e) => {
		action.toggleTicketPosterModal({ open: true, type: e.key });
	};

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="buying">Tìm Mua</Menu.Item>
			<Menu.Item key="selling">Đăng Bán</Menu.Item>
		</Menu>
	);

	return (
		<CheckLogin>
			{
				AuthStorage.loggedIn ?
					<Dropdown overlay={menu} trigger={['click']}>
						{
							children || <Button type="primary" size="small" className={classes.postBtn}>Đăng tin</Button>
						}
					</Dropdown> :
					children || <Button type="primary" size="small" className={classes.postBtn}>Đăng tin</Button>
			}
		</CheckLogin>
	);
};

BtnTicketPoster.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	// store
	// store: PropTypes.shape({
	// 	modal: PropTypes.object.isRequired,
	// }).isRequired,
	// action
	action: PropTypes.shape({
		toggleTicketPosterModal: PropTypes.func.isRequired,
	}).isRequired,
};

BtnTicketPoster.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(BtnTicketPoster));
