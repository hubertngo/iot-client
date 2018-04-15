/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 14:05:13
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'src/theme/jss/withStyles';

import { Modal } from 'antd';

import RatingForm from 'src/components/Form/Rating';

import { toggleRatingModal } from 'src/redux/actions/modal';

const styleSheet = (/* theme */) => ({
	wrap: {
		textAlign: 'center',
	},
	root: {
		display: 'inline-block',
		'& .ant-modal-close': {
			display: 'none',
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			modal: state.get('modal').toJS(),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleRatingModal,
		}, dispatch),
	};
};

const RatingModal = (props) => {
	const { classes, store: { modal: { rating } } } = props;

	return (
		<Modal
			// title="Basic Modal"
			visible={rating.open}
			closable={rating.closable}
			footer={null}
			bodyStyle={{ padding: 0 }}
			className={classes.root}
			wrapClassName={classes.wrap}
			width={450}
			destroyOnClose
			onCancel={rating.closable ? f => f : () => props.action.toggleRatingModal({ open: false })}
		>
			<RatingForm />
		</Modal>
	);
};

RatingModal.propTypes = {
	classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		modal: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		toggleRatingModal: PropTypes.func.isRequired,
	}).isRequired,
};

RatingModal.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(RatingModal));
