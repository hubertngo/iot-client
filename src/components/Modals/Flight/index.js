/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 14:05:13
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router, { withRouter } from 'next/router';

import withStyles from 'src/theme/jss/withStyles';

import { Modal } from 'antd';

import FlightDetail from 'src/components/Flight/Card/Detail';

import { toggleFlightModal } from 'src/redux/actions/modal';
import { getTicketSellingData } from 'src/redux/actions/ticket-selling';
import { getTicketBuyingData } from 'src/redux/actions/ticket-buying';

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
			ticketSellingView: state.getIn(['ticketSelling', 'view']),
			ticketBuyingView: state.getIn(['ticketBuying', 'view']),
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleFlightModal,
			getTicketSellingData,
			getTicketBuyingData,
		}, dispatch),
	};
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styleSheet)
export default class FlightModal extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleFlightModal: PropTypes.func.isRequired,
			getTicketSellingData: PropTypes.func.isRequired,
			getTicketBuyingData: PropTypes.func.isRequired,
		}).isRequired,
		router: PropTypes.shape({
			query: PropTypes.object,
		}).isRequired,
	}

	constructor(props) {
		super(props);

		const { query } = props.router;

		if (query && query.ticketId) {

			if (typeof window !== 'undefined') {
				if (window.innerWidth < 992) {
					Router.push(`/ticket-${query.type}/${query.ticketId}`);
				}
			}

			const params = {
				id: query.ticketId,
				filter: {
					include: [
						{
							relation: 'creator',
							scope: {
								fields: ['id', 'username', 'avatar', 'fullName', 'ratingsCount', 'ratingsStats'],
							},
						},
					],
				},
			};

			this.state = { active: true };

			if (query.type === 'selling') {
				this.props.action.getTicketSellingData(params);
			} else {
				this.props.action.getTicketBuyingData(params);
			}
			this._type = query.type;
		} else {
			this.state = { active: false };
		}
	}

	componentWillReceiveProps(nextProps) {
		const { flight } = nextProps.store.modal;

		if (!this.props.store.modal.flight.open && flight.open) {
			const params = {
				id: flight.id,
				filter: {
					include: [
						{
							relation: 'creator',
							scope: {
								fields: ['id', 'username', 'avatar', 'fullName', 'ratingsCount', 'ratingsStats'],
							},
						},
					],
				},
			};

			this.setState({ active: true });

			if (flight.type === 'selling') {
				nextProps.action.getTicketSellingData(params);
			} else {
				nextProps.action.getTicketBuyingData(params);
			}

			this._type = flight.type;
		}
	}

	_type = 'selling'

	handleCancel = () => {
		this.setState({ active: false });
		this.props.action.toggleFlightModal({ open: false });
	}

	render() {
		const { classes, store: { modal: { flight }, ticketSellingView, ticketBuyingView }, action } = this.props;
		const flightData = this._type === 'selling' ? ticketSellingView : ticketBuyingView;

		return (
			<Modal
				// title="Basic Modal"
				visible={this.state.active}
				closable={flight.closable}
				footer={null}
				bodyStyle={{ padding: 0 }}
				className={classes.root}
				wrapClassName={classes.wrap}
				destroyOnClose
				onCancel={this.handleCancel}
				// onCancel={flight.closable ? f => f : () => action.toggleFlightModal({ open: false })}
			>
				<FlightDetail flightData={flightData} type={flight.type} onCancel={this.handleCancel} />
			</Modal>
		);
	}
}

