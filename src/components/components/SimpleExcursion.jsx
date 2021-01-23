import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Rate } from 'antd';

import { HoverBox } from '../common/HoverBox';
import { HoverBoxInfo } from '../common/HoverBoxInfo';
import { AMD_Rate } from '../../util/config';
import { makeRoundedRate } from '../../util/helpers';

// eslint-disable-next-line react/display-name
export const SimpleExcursion = memo(({ tour, lng, fromToursToday }) => {
    const { t } = useTranslation();
    const lngPrefix = lng === 'Eng' ? 'en' : 'ru';
    const { country } = useSelector(s => s.globals);
    const isFromArmenia = country == 'Armenia';
    return (
        <div className='simpleExcursion-container'>
            <div className='simpleExcursion-container-header'>
                <p className='simpleExcursion-container-header-p'>
                    <span className='simpleExcursion-container-header-span'>{tour[`${lngPrefix}_name`]}</span>
                </p>

                <Rate allowHalf value={makeRoundedRate(tour.rate)} disabled />
                {fromToursToday ?
                    <div>
                        <span className='tour-start'>{t('Starting at : ')}</span>
                        <span className='tour-time'>{tour.openTime}</span>
                    </div>
                    :
                    <div></div>}
            </div>
            <HoverBox
                imagePath={`${tour.images[0]}`}
                fadeIn='bottom'
            >
                <HoverBoxInfo
                    categoryName={tour.category[`${lngPrefix}_name`]}
                    adultPrice={isFromArmenia ? '֏' + tour.priceForAdults * AMD_Rate : '$' + tour.priceForAdults}
                    childPrice={tour.priceForChildren && isFromArmenia ? '֏' + tour.priceForChildren * AMD_Rate : '$' + tour.priceForChildren}
                />
            </HoverBox>
        </div>
    )
});
SimpleExcursion.propTypes = {
    tour: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    fromToursToday: PropTypes.bool,
};