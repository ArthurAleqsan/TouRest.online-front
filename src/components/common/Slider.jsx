import React, { useRef, useState } from 'react';
import  SliderContentDesc  from './SliderContentesc';
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
import IconComponent from '../simpleUIComponents/IconComponent';



const Slider = () => {
    const carousel = useRef(null);
    const { imagesArr } = useSelector(s => s.globals);
    const [index, setIndex] = useState(0);
    const handleChange = () => {
        setIndex(index + 1);
    }
    const handleSliderChange = (isNext) => {
        if (isNext) {
            carousel.current.next();
            setIndex(index + 1);
        }
        else {
            carousel.current.prev();
            setIndex(index - 1);
        }
    };

    return (
        <div className='slider' >
            <Carousel
                afterChange={() => handleChange()}
                className='carousel-container'
                ref={carousel}
                // autoplay
            >
                {imagesArr && imagesArr.map((image, i) => (<div key={i} className='carusel-item-container'>
                    <img className='image' src={image} />
                </div>))}

            </Carousel>

            <div className={`buttom-container ${imagesArr.length < 2 ? 'hide-buttom' : ''}`}>
                <div className='button-prev link' onClick={() => handleSliderChange(false)}>
                    <div className='icon-container' style={{ width: 25, height: 25, color: '#33b7c9' }}>
                        <IconComponent icon='leftArrow' />
                    </div>
                </div>
                <div className='button-next link' onClick={() => handleSliderChange(true)}>
                    <div className='icon-container' style={{ width: 25, height: 25, color: '#33b7c9' }}>
                        <IconComponent icon='rightArrow' />
                    </div>
                </div>
            </div>
            <SliderContentDesc />
        </div>
    )
};

export default Slider;