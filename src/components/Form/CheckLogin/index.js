/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-17 12:49:07
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthStorage from 'src/utils/AuthStorage';

import { toggleLoginModal } from 'src/redux/actions/modal';

function mapStateToProps(/* state */) {
	return {};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleLoginModal,
		}, dispatch),
	};
};

const CheckLogin = (props) => {
	const { children, onClick, style } = props;

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (AuthStorage.loggedIn) {
			onClick();
		} else {
			props.action.toggleLoginModal({ open: true });
		}
	};

	return (
		<div style={style} onClick={handleClick}>
			{children}
		</div>
	);
};

CheckLogin.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	style: PropTypes.object,
	// action
	action: PropTypes.shape({
		toggleLoginModal: PropTypes.func.isRequired,
	}).isRequired,
};

CheckLogin.defaultProps = {
	onClick: f => f,
	style: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckLogin);
