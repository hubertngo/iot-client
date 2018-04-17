import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { toggleRatingModal } from 'src/redux/actions/modal';
import CheckLogin from 'src/components/Form/CheckLogin';
import AuthStorage from 'src/utils/AuthStorage';

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
export default class GroupStar extends Component {
	static propTypes = {
		rating: PropTypes.bool,
		rate: PropTypes.number,
		onChange: PropTypes.func,
		action: PropTypes.shape({
			toggleRatingModal: PropTypes.func,
		}).isRequired,
		userId: PropTypes.string,
	}

	static defaultProps = {
		rating: false,
		rate: 0,
		onChange: null,
		userId: '',
	}

	state = {
		rate: this.props.rate,
	}

	handleClick = (index) => {
		this.setState({
			rate: index + 1,
		}, () => {
			if (this.props.onChange) {
				this.props.onChange(this.state.rate);
			}
		});
	}

	handleRate = () => {
		this.props.action.toggleRatingModal({ open: true });
	}

	render() {
		const { rate } = this.state;
		const { rating, userId } = this.props;

		return (
			<CheckLogin onClick={(rating || userId === AuthStorage.userId) ? null : this.handleRate}>
				<div>
					{
						[0, 0, 0, 0, 0].map((item, index) => (
							<Icon
								type="star"
								key={index}
								style={{ color: rate > index ? '#FFB74D' : '#95A2AB', cursor: 'pointer' }}
								onClick={rating ? this.handleClick.bind(this, index) : null}
							/>
						))
					}
				</div>
			</CheckLogin>

		);
	}
}

// GroupStar.propTypes = {
// 	rate: PropTypes.number,
// };

// GroupStar.defaultProps = {
// 	rate: 0,
// };

