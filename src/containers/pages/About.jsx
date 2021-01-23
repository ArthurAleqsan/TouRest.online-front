import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Carousel } from 'antd';

import { about } from '../../util/config';
import { getLngKey } from '../../util/helpers';
import EyeSlider from '../../components/common/EyeSlider';

const About = () => {
    const { t } = useTranslation();
    const currentRef = useRef(null)
    const { lng } = useSelector(s => s.globals);
    const [activeItem, setActiveItem] = useState(0);
    const handleSetActive = (index) => {
        setActiveItem(index);
        currentRef.current.goTo(index);
    }
    return (
        <div className='about-page tours'>
            <div className='about-header'>{t('About Us')}</div>
            <div className='about-carousel'>
                <div className='titles-container'>
                    {about[`${getLngKey(lng)}_titles`].map((item, index) => {
                        return <EyeSlider
                            showedItemsCount={about[`${getLngKey(lng)}_titles`].length}
                            key={index}
                            index={index}
                            item={item}
                            active={activeItem}
                            setActive={() => handleSetActive(index)}
                        />
                    })}
                </div>
                <Carousel
                    effect='fade'
                    ref={currentRef}
                    dots={false}
                    className ='carousel'
                >
                    {about[`${getLngKey(lng)}_desc`].map((desc, i) => {
                        return <div key={i} className='carousel-text'>
                            <span>{desc}</span>
                        </div>
                    })}
                </Carousel>
            </div>

        </div>
    )
}

export default About;
