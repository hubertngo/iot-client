/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-15 16:45:12
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'src/theme/jss/withStyles';

import { Row, Col, Icon } from 'antd';

import Container from 'src/components/Layout/Container';

const styles = (/* theme */) => ({
	root: {
		padding: '40px 0 50px !important',
		// marginTop: '24px',
		background: '#ededed',
		borderTop: '1px solid #e4e1e1',
	},
	logo: {
		height: '30px',
		marginBottom: '20px',
	},
	phoneWrapper: {
		position: 'fixed',
		zIndex: 99999,
		width: 60,
		height: 60,
		right: 80,
		bottom: 20,
		borderRadius: '50%',
		background: 'green',
	},
	phone: {
		width: 60,
		height: 60,
		bottom: 15,
		right: 95,
		position: 'fixed',
		background: '#4CAD2A url(/static/assets/images/call.png) no-repeat center center',
		borderRadius: '100%',
		border: '2px solid transparent',
		zIndex: 99999,
	},
});

const Footer = (props) => {
	const { classes = {} } = props;

	return (
		<footer className={classes.root + ' text-center-xs-down'}>
			<Container>
				<img className={classes.logo} src="/static/assets/images/logo/2x.png" alt="chove.vn" />
				<Row type="flex">
					<Col md={12} xs={24}>
						Hệ thống bán thanh lý các loại vé chưa sử dụng. Phiên bản beta1. <br />
						Địa chỉ: 25 Lạc Trung, Vĩnh Tuy, Hai Bà Trưng, Hà Nội.<br />
						Hotline: 0913231019<br />
					</Col>
					<Col md={12} xs={24}>
						Một sản phẩm của Chove.vn <br />
						© Chove.vn <br />
					</Col>
				</Row>
			</Container>
			<a href="tel:0913231019">
				<div className={classes.phone} />
			</a>
		</footer>
	);
};

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

Footer.defaultProps = {
	// classes: {},
};

export default withStyles(styles)(Footer);
