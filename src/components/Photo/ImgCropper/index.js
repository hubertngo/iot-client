/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-01 09:56:56
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAvatarEditor from 'react-avatar-editor';

import { Icon, Slider, Modal } from 'antd';

import withStyles from 'src/theme/jss/withStyles';

const styleSheet = (/* theme */) => ({
	preview: {
		background: '#ccc',
		textAlign: 'center',
		overflow: 'hidden',
		cursor: 'pointer',
		position: 'relative',
		border: '1px solid #e8e8e8',
		'&:hover $mark': {
			opacity: '1 !important',
		},
	},
	mark: {
		position: 'absolute',
		zIndex: '1',
		top: '0',
		bottom: '0',
		right: '0',
		left: '0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'rgba(0, 0, 0, 0.3)',
		color: 'rgba(255, 255, 255, 0.8)',
		opacity: 0,
		transition: 'all .5s',
	},
});

@withStyles(styleSheet)
export default class ImgCropper extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		size: PropTypes.number,
		value: PropTypes.string,
		borderRadius: PropTypes.number,
		onChange: PropTypes.func,
		id: PropTypes.string,
	}

	static defaultProps = {
		borderRadius: '100%',
		size: 100,
		value: '',
		onChange: f => f,
		id: 'avatar-cropper',
	}

	state = {
		position: { x: 0.5, y: 0.5 },
		scale: 1,
		rotate: 0,
		borderRadius: 0,
		preview: null,
		visible: false,
	}

	handleSetEditorRef = editor => {
		if (editor) this.editor = editor;
	}

	handleNewImage = e => {
		this.setState({
			image: e.target.files[0],
			visible: true,
		});
	}

	handleSave = () => {
		const img = this.editor.getImageScaledToCanvas().toDataURL();
		const rect = this.editor.getCroppingRect();

		this.props.onChange(img);

		this.setState({
			preview: {
				img,
				rect,
				scale: this.state.scale,
				width: this.state.width,
				height: this.state.height,
				borderRadius: this.state.borderRadius,
			},
			visible: false,
		});
	}

	handleScale = (value) => {
		this.setState({ scale: value });
	}

	handleRotateLeft = (e) => {
		e.preventDefault();

		this.setState({
			rotate: this.state.rotate - 90,
		});
	}

	handleRotateRight = (e) => {
		e.preventDefault();
		this.setState({
			rotate: this.state.rotate + 90,
		});
	}

	handlePositionChange = position => {
		this.setState({ position });
	}

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}

	render() {
		const { size, value, classes, borderRadius, id } = this.props;

		return (
			<div style={{ display: 'flex' }}>
				<label htmlFor={id} style={{ display: 'inline-block' }}>
					<div
						className={classes.preview}
						style={{
							height: size,
							width: size,
							fontSize: size * 0.3,
							borderRadius,
						}}
					>
						{
							!!this.state.preview && !value &&
							<img
								alt="preview"
								src={this.state.preview.img}
								style={{
									height: '100%',
									width: '100%',
								}}
							/>
						}

						{
							value &&
							<img
								alt="preview"
								src={value}
								style={{
									height: '100%',
									width: '100%',
								}}
							/>
						}

						<div
							style={{
								opacity: !!this.state.preview || value ? 0 : 1,
							}}
							className={classes.mark}
						>
							<Icon type="camera" />
						</div>
					</div>

					<input accept="image/*" id={id} type="file" onChange={this.handleNewImage} style={{ display: 'none' }} />
				</label>

				<Modal
					title="Crop image"
					visible={this.state.visible}
					onOk={this.handleSave}
					onCancel={this.handleCancel}
					maskClosable={false}
					width={(size * 3) + 200}
				>
					<div className="text-center">
						<ReactAvatarEditor
							ref={this.handleSetEditorRef}
							scale={parseFloat(this.state.scale)}
							width={size * 2}
							height={size * 2}
							position={this.state.position}
							onPositionChange={this.handlePositionChange}
							rotate={parseFloat(this.state.rotate)}
							borderRadius={borderRadius}
							onSave={this.handleSave}
							// onLoadFailure={() => this.logCallback('onLoadFailed')}
							// onLoadSuccess={this.handleLoadImgSuccess}
							// onImageReady={() => this.logCallback('onImageReady')}
							// onImageLoad={() => this.logCallback('onImageLoad')}
							// onDropFile={() => this.logCallback('onDropFile')}
							image={this.state.image}
							// style={{
							// 	width: 450,
							// 	height: 450,
							// }}
						/>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: 30,
							}}
						>
							<Slider
								onChange={this.handleScale}
								min={1}
								max={2}
								step={0.01}
								value={this.state.scale}
								style={{ flex: 1 }}
							/>
							<a
								onClick={this.handleRotateRight}
								style={{
									fontSize: '18px',
									marginLeft: '20px',
								}}
							>
								<Icon type="reload" />
							</a>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}
