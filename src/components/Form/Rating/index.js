/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 15:52:03
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Icon, Input, Button } from 'antd';

import GroupStar from 'src/components/Flight/Card/GroupStar';
import AuthStorage from 'src/utils/AuthStorage';

import withStyles from 'src/theme/jss/withStyles';

import { createRating } from 'src/redux/actions/rating';
import { toggleRatingModal } from 'src/redux/actions/modal';
import { startLoader, stopLoader } from 'src/redux/actions/loading';

const styleSheet = (/* theme */) => ({
	root: {
		position: 'relative',
		textAlign: 'left',
	},
	header: {
		textTransform: 'uppercase',
		padding: 15,
		background: '#3261EE',
		color: '#FFF',
	},
	closeBtn: {
		position: 'absolute',
		right: 15,
		top: 15,
		fontSize: '20px',
		cursor: 'pointer',
		color: '#FFF',
	},
	body: {
		padding: '20px 15px',
		fontSize: 24,
	},
	note: {
		fontSize: 14,
	},
	footer: {
		textAlign: 'right',
		padding: '0 15px 20px',
	},
});

function mapStateToProps(state) {
	return {
		store: {
			// auth: state.get('auth').toJS(),
			modal: state.get('modal').toJS(),
			userView: state.getIn(['user', 'view']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleRatingModal,
			createRating,
			startLoader,
			stopLoader,
		}, dispatch),
	};
};

@withStyles(styleSheet)
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class LoginForm extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			userView: PropTypes.object,
			modal: PropTypes.object,
		}).isRequired,
		// action
		action: PropTypes.shape({
			createRating: PropTypes.func.isRequired,
			toggleRatingModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
	}

	state = {
		loading: false,
	}

	rate = 0

	handleChangeRate = (rate) => {
		this.rate = rate;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const dataSend = {
					...values,
					star: this.rate,
					receiverId: this.props.store.modal.rating.receiverId,
					creatorId: AuthStorage.userId,
				};

				this.props.action.createRating(dataSend, () => {
					this.setState({ isVoted: true });
					// this.props.action.toggleRatingModal({ open: false });
				});
			}
		});
	}

	render() {
		const { classes, action, form: { getFieldDecorator } } = this.props;

		if (this.state.isVoted) {
			return (
				<Form className={classes.root} onSubmit={this.handleSubmit}>
					<Icon type="close" className={classes.closeBtn} onClick={this.state.loading ? f => f : () => action.toggleRatingModal({ open: false })} />
					<div className={classes.header}>
						Đánh giá người dùng
					</div>
					<div className={classes.body}>
						<GroupStar rate={this.rate} />
						<p className={classes.note}><b>Cảm ơn bạn</b> đã vote cho tôi</p>
					</div>
					<div className={classes.footer}>
						<Button onClick={() => action.toggleRatingModal({ open: false })} type="primary" className={classes.btn}>Đóng</Button>
					</div>
				</Form>
			);
		}

		return (
			<Form className={classes.root} onSubmit={this.handleSubmit}>
				<Icon type="close" className={classes.closeBtn} onClick={this.state.loading ? f => f : () => action.toggleRatingModal({ open: false })} />
				<div className={classes.header}>
					Đánh giá người dùng
				</div>
				<div className={classes.body}>
					<GroupStar rating onChange={this.handleChangeRate} />
					<p className={classes.note}><b>Bạn</b> chưa hài lòng ở điểm nào, vui lòng để lại bình luận bằng cách nhập nội dung vào ô dưới đây</p>
					<Form.Item>
						{getFieldDecorator('comment', {
							rules: [{ required: true, message: 'Vui lòng nhập đánh giá của bạn!' }],
						})(
							<Input.TextArea placeholder="Nhập nội dung bình luận..." />,
						)}
					</Form.Item>
				</div>
				<div className={classes.footer}>
					<Button type="primary" htmlType="submit" className={classes.btn}>Gửi</Button>
				</div>
			</Form>
		);
	}
}
