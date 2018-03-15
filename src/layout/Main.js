/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-11 10:06:38
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/components/Layout/Header';
import Footer from 'src/components/Layout/Footer';

const MainLayout = (props) => {
	const { children, className } = props;

	return (
		<div style={{ display: 'flex', flexFlow: 'column', minHeight: '100vh' }}>
			<Header />
			<main id="content" style={{ flex: 1 }} className={className}>
				{children}
			</main>
			<Footer />
		</div>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

MainLayout.defaultProps = {
	className: '',
};

export default MainLayout;
