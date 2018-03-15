/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-01 09:34:18
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';

import { Button } from 'antd';

import MainLayout from 'src/layout/Main';

import Container from 'src/components/Layout/Container';
import Avatar from 'src/components/Photo/Avatar';
import ImgCropper from 'src/components/Photo/ImgCropper';
import CheckLogin from 'src/components/Form/CheckLogin';
import ReadMore from 'src/components/Stuff/ReadMore';

@withRoot
export default class ComponentListPage extends PureComponent {
	render() {
		return (
			<MainLayout>
				<Head>
					<title>Chove.vn - Component List</title>
				</Head>
				<Container style={{ marginTop: '50px' }}>
					<h3>Avatar</h3>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Avatar size={32} name="Trần Đức Tiến" />
						<Avatar size={40} name="Trần Đức Tiến" src="https://lh3.googleusercontent.com/-KgdUWr2xJlE/AAAAAAAAAAI/AAAAAAAAAAA/AGi4gfziEQ7NVE_9dqzqUTUDT2V0Nt0hDg/s64-c-mo/photo.jpg" />
						<Avatar size={48} name="Trân Tiến" colors={['#ccc', '#fafafa', '#ccaabb']} />
						<Avatar size={48} name="Đức Tiến" />
						<Avatar size={48} name="Jane Doe" color="#ccc" />
						<Avatar size={48} name="Tiến" />
					</div>
				</Container>
				<Container style={{ marginTop: '50px' }}>
					<h3>Img Cropper </h3>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<ImgCropper id="crop-1" />
						<ImgCropper id="crop-2" size={50} value="https://lh3.googleusercontent.com/-KgdUWr2xJlE/AAAAAAAAAAI/AAAAAAAAAAA/AGi4gfziEQ7NVE_9dqzqUTUDT2V0Nt0hDg/s64-c-mo/photo.jpg" />
					</div>
				</Container>
				<Container style={{ marginTop: '50px' }}>
					<h3>Check Login</h3>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<CheckLogin onClick={() => { alert('Bạn đã login'); }}>
							<Button type="primary">Primary</Button>
						</CheckLogin>
					</div>
				</Container>
				<Container style={{ marginTop: '50px' }}>
					<h3>Read More</h3>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<ReadMore>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga error quasi molestias ratione ipsa officiis quas, in architecto voluptatum cum, similique repellendus et suscipit dolore dignissimos unde vel laboriosam nostrum?
						</ReadMore>
					</div>
				</Container>
			</MainLayout>
		);
	}
}
