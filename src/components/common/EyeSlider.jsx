import React from 'react';
import PropTypes from 'prop-types';

const EyeSlider = ({ item, index, active, setActive }) => {

    return (
        <div className='eye-slider-container'>
            <div
                className={active === index ? 'eye-slider-container-item-box active' : 'eye-slider-container-item-box'}
                style={{ height: '80px' }}
                onClick={() => setActive(index)}
            >
                <div className='eye-slider-container-item'>{item}</div>
                <div className='eye-slider-dots'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
            </div>

        </div>
    )
};
EyeSlider.propTypes = {
    item: PropTypes.string.isRequired,
    index: PropTypes.number,
    active: PropTypes.number,
    setActive: PropTypes.func.isRequired,
    showedItemsCount: PropTypes.number.isRequired,
};
export default EyeSlider;