import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import IconComponent from '../simpleUIComponents/IconComponent';

// eslint-disable-next-line react/display-name
export const HoverBoxInfo = memo(({ categoryName, adultPrice, childPrice }) => {
    const { t } = useTranslation();
    return (
        <div className='hoverBoxInfo-container'>
            <div className='hoverBoxInfo-content'>
                <span className='hoverBoxInfo-content-span'>{t('Category')}: </span>
                <span className='hoverBoxInfo-content-span categoryname'> {t(categoryName)}</span>
            </div>
            <div className='hoverBoxInfo-content'>
                <span className='hoverBoxInfo-content-span'>{childPrice ? t('For Adults/Childs Starting from') : t('For Adults Starting from')}:</span>
                <span className='hoverBoxInfo-content-span price'> {childPrice ? `${adultPrice} / ${childPrice}` : adultPrice}</span>
            </div>
            <div className='hoverBoxInfo-content'>
                <div style={{ width: 15, height: 15, color: '#000' }}>
                    <IconComponent icon='compass' />
                </div>
                <span className='hoverBoxInfo-content-span'> {t('See More')}</span>
            </div>
        </div>
    )
});

HoverBoxInfo.propTypes = {
    categoryName: PropTypes.string.isRequired,
    adultPrice: PropTypes.string.isRequired,
    childPrice: PropTypes.any,
};