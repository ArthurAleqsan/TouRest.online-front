import React, { memo } from 'react';
import PropTypes from 'prop-types';


// eslint-disable-next-line react/display-name
const SliderContentDesc = memo(({ header, text }) => {
    // const { header, text } = desc;
    return (
        <div className='content-container'>
            <div className='sliderText-container'>
                <div className='header-container' >
                    {header}
                </div>
                <div className='text-container'>
                    {text}
                </div>
            </div>
        </div>
    )
});
SliderContentDesc.propTypes = {
    // desc: PropTypes.object.isRequired,
};

export default SliderContentDesc;