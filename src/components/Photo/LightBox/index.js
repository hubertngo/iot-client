/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-15 15:01:32
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';

export default class ImageLightBox extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		images: PropTypes.arrayOf(PropTypes.string),
		img: PropTypes.string,
	}

	static defaultProps = {
		className: '',
		images: [],
		img: '',
	}

	constructor(props) {
		super(props);
		this.state = {
			img: props.img,
			images: props.images,
			photoIndex: 0,
			isOpen: false,
		};
	}

	isImages() {
		const { images } = this.state;
		return images.length && images.length > 1;
	}

	isImg() {
		const { images, img } = this.state;
		return img || images.length === 1;
	}

	handleToggleLightBox = () => {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen,
		}));
	}

	handlePickNextImage = () => {
		const { photoIndex, images } = this.state;
		this.setState({
			photoIndex: (photoIndex + 1) % images.length,
		});
	}

	handlePickPrevImage = () => {
		const { photoIndex, images } = this.state;
		this.setState({
			photoIndex: ((photoIndex + images.length) - 1) % images.length,
		});
	}

	handleImageOnClick = (index = 0) => {
		this.setState({ photoIndex: index });
		this.handleToggleLightBox();
	}

	handleRenderLightBox = () => {
		const { images, img, photoIndex } = this.state;
		if (this.isImages()) {
			return (
				<Lightbox
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={images[((photoIndex + images.length) - 1) % images.length]}
					onCloseRequest={this.handleToggleLightBox}
					onMovePrevRequest={this.handlePickPrevImage}
					onMoveNextRequest={this.handlePickNextImage}
				/>
			);
		} else if (this.isImg()) {
			return (
				<Lightbox
					mainSrc={img || images[0]}
					onCloseRequest={this.handleToggleLightBox}
				/>
			);
		}
	}

	renderImage() {
		const { images, img } = this.state;
		if (this.isImages()) {
			return (
				images.map((src, i) => {
					return <img key={i} src={src} alt={src} style={{ cursor: 'zoom-in'}} onClick={() => this.handleImageOnClick(i)} />; // eslint-disable-line
				})
			);
		} else if (this.isImg()) {
			const src = img || images[0];
			return <img src={src} alt={src} style={{ cursor: 'zoom-in' }} onClick={this.handleImageOnClick} />; // eslint-disable-line
		}
	}

	render() {
		const { className } = this.props;
		return (
			<div className={className}>
				{this.renderImage()}
				{ this.state.isOpen && this.handleRenderLightBox()}
			</div>
		);
	}
}
