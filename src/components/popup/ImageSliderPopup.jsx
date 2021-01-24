import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Carousel } from 'antd';

const ImageSliderPopup = ({ visible, toggleVisibility, imagesPathArr }) => {
    return (
        <Modal
            visible={visible}
            onCancel={() => toggleVisibility(false)}
            footer={null}
            closable={false}
            className={'images-modal'}
            centered={true}
        // maskStyle={{ background: 'rgba(0, 0, 0, 0.85)' }}
        >
            <Carousel
                // afterChange={() => handleChange()}
                className='carousel-container'
            // ref={carousel}
            // autoplay
            >
                {imagesPathArr.map(image => (<div key={image} className='modal-carousel-image-container'>
                    <img className='image' src={image} alt={image} />
                </div>))}
            </Carousel>
        </Modal>
    )
};
ImageSliderPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    imagesPathArr: PropTypes.array.isRequired,
};

export default ImageSliderPopup;
