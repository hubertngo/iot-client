import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Rate } from 'antd';

import withStyles from 'src/theme/jss/withStyles';

import FaStar from 'react-icons/lib/fa/star';

import { toggleRatingModal } from 'src/redux/actions/modal';

import CheckLogin from 'src/components/Form/CheckLogin';
import AuthStorage from 'src/utils/AuthStorage';

const styleSheet = (/* theme */) => ({
	rate: {
		lineHeight: '1',
		'& li': {
			color: '#FF7B1F',
			marginRight: '0 !important',
			fontSize: 16,
			cursor: 'pointer !important',
		},
	},
});

function mapStateToProps(state) {
	return {
		store: {
			auth: state.get('auth').toJS(),
			modal: state.get('modal').toJS(),
			userView: state.getIn(['user', 'view']),
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
@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
export default class GroupStar extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		ratingsStats: PropTypes.object,
		action: PropTypes.shape({
			toggleRatingModal: PropTypes.func.isRequired,
		}).isRequired,
		userId: PropTypes.string,
	}

	static defaultProps = {
		ratingsStats: {
			star: 0,
		},
		userId: '',
	}

	handleToggleRatingModal = () => {
		const { userId } = this.props;

		if (userId === AuthStorage.userId) {
			console.log('doing nothing');
		} else {
			this.props.action.toggleRatingModal({ open: true, receiverId: this.props.userId });
		}
	}

	render() {
		const { ratingsStats, classes } = this.props;

		return (
			<CheckLogin onClick={this.handleToggleRatingModal}>
				<Rate
					disabled
					character={<FaStar />}
					value={ratingsStats.star}
					allowHalf
					className={classes.rate}
				/>
			</CheckLogin>

		);
	}
}
