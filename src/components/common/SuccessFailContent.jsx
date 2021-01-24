import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';


const SuccessFailContent = ({ handleClick, isFromCartPage, isSuccess, text }) => {
    const { t } = useTranslation();
    let content;
     if (isSuccess) {
        content = <div className='modal-register'>
            <div className='modal-img'>
                <img src={'/assets/images/icons/success.svg'} />
            </div>
            <div className='modal-text success'>{t('Success!')}</div>
            <div className='text'>{isFromCartPage ? t('Tour is removed') : t('Tour is added to your cart')}</div>
            <div className='modal-button' onClick={() => handleClick()}>{t('Ok')}</div>
        </div>
    } else {
        content = <div className='modal-register'>
            <div className='modal-img'>
                <img src={'/assets/images/icons/fail.svg'} />
            </div>
            <div className='modal-text fail'>{t('Ooops!')}</div>
            <div className='text'>
                <div>{t('Please fill all required fileds')}</div>
            </div>
            <div className='modal-button' onClick={() => handleClick()}>{t('Ok')}</div>
        </div>
    }
    return content;
};

SuccessFailContent.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isFromCartPage: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
};

export default SuccessFailContent;