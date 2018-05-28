/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-11 10:06:38
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from 'src/components/Layout/basic/Menu';

const { Sider, Content } = Layout;
const MainLayout = (props) => {
	const { children } = props;

	return (
		<Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
			<Sider collapsible style={{ backgroundColor: '#ffffff' }}>
				<Menu />
			</Sider>
			<Layout>
				{children}
			</Layout>
		</Layout>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

MainLayout.defaultProps = {
};

export default MainLayout;
