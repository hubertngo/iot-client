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
import { injectIntl, intlShape } from 'react-intl';
import { Form, Icon, Input, Button, Rate } from 'antd';

import AuthStorage from 'src/utils/AuthStorage';

import withStyles from 'src/theme/jss/withStyles';

import FaStar from 'react-icons/lib/fa/star';

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
		margin: '20px 0',
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
@injectIntl
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
		intl: intlShape.isRequired,
	}

	static defaultProps = {
	}

	state = {
		loading: false,
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const dataSend = {
					...values,
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
		const { classes, action, form: { getFieldDecorator, getFieldValue }, intl: { formatMessage } } = this.props;

		if (this.state.isVoted) {
			return (
				<Form className={classes.root} onSubmit={this.handleSubmit}>
					<Icon type="close" className={classes.closeBtn} onClick={this.state.loading ? f => f : () => action.toggleRatingModal({ open: false })} />
					<div className={classes.header}>
						{formatMessage({ id: 'user_rate' })}
					</div>
					<div className={classes.body + ' text-center'}>
						<p className={classes.note}><b>{formatMessage({ id: 'thank_you' })}</b> {formatMessage({ id: 'voted_for_me' })}</p>
					</div>
					<div className={classes.footer}>
						<Button onClick={() => action.toggleRatingModal({ open: false })} type="primary" className={classes.btn}>{formatMessage({ id: 'close' })}</Button>
					</div>
				</Form>
			);
		}

		return (
			<Form className={classes.root} onSubmit={this.handleSubmit}>
				<Icon type="close" className={classes.closeBtn} onClick={this.state.loading ? f => f : () => action.toggleRatingModal({ open: false })} />
				<div className={classes.header}>
					{formatMessage({ id: 'user_rate' })}
				</div>
				<div className={classes.body}>
					<Form.Item>
						{getFieldDecorator('star', {
							rules: [{ required: true, message: 'Vui lòng chấm điểm!' }],
						})(
							<Rate character={<FaStar />} style={{ color: '#FF7B1F', marginRight: 5, fontSize: 24 }} />,
						)}
						{getFieldValue('star') || 0}/5 {formatMessage({ id: 'point' })}
					</Form.Item>

					<p className={classes.note}><b>{formatMessage({ id: 'you' })}</b> {formatMessage({ id: 'not_satisfied_and_comment' })}</p>
					<Form.Item>
						{getFieldDecorator('comment', {
							rules: [{ required: true, message: formatMessage({ id: 'comment_required' }) }],
						})(
							<Input.TextArea placeholder={formatMessage({ id: 'comment_content' })} rows={6} />,
						)}
					</Form.Item>
				</div>
				<div className={classes.footer}>
					<Button type="primary" htmlType="submit" className={classes.btn}>{formatMessage({ id: 'send' })}</Button>
				</div>
			</Form>
		);
	}
}
