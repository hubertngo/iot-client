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
								fields: ['id', 'username', 'avatar', 'fullName', 'ratingsCount'],
							},
						},
					],
				},
			};

			if (flight.type === 'selling') {
				nextProps.action.getTicketSellingData(params);
			} else {
				nextProps.action.getTicketBuyingData(params);
			}
		}
	}

	render() {
		const { classes, store: { modal: { flight }, ticketSellingView, ticketBuyingView }, action } = this.props;
		const flightData = flight.type === 'selling' ? ticketSellingView : ticketBuyingView;

		return (
			<Modal
				// title="Basic Modal"
				visible={flight.open}
				closable={flight.closable}
				footer={null}
				bodyStyle={{ padding: 0 }}
				className={classes.root}
				wrapClassName={classes.wrap}
				destroyOnClose
				onCancel={flight.closable ? f => f : () => action.toggleFlightModal({ open: false })}
			>
				<FlightDetail flightData={flightData} type={flight.type} />
			</Modal>
		);
	}
}

