import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Input, DatePicker, Button } from 'antd';
import { useDispatch } from 'react-redux';


// eslint-disable-next-line react/display-name
export const OrderPopupStepTwo = memo(({ grandtotal, handlePagination, buy, setOrderData, userData }) => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const { MonthPicker } = DatePicker;
    const onChange = (_, dateString) => {
        setOrderData(dispatch, 'expireDate', dateString);
    }
    const handleChange = (name, value) => {
        setOrderData(dispatch, name, value);
    }
    return (
        <div className='orderPopup-card-info-container second-step'>

            <div className='card-input-container'>
                <label className='input-label'>{t('Cardholder Name')}</label>
                <Input placeholder={'Name Surname'} name='cardholderCard' value={userData.cardholderCard} onChange={(e) => handleChange([e.target.name], e.target.value)} />
            </div>
            <div className='card-input-container'>
                <label className='input-label'>{t('Card No')} </label>
                <Input placeholder={'**** **** **** ****'} name='cardNumber' value={userData.cardNumber} onChange={(e) => handleChange([e.target.name], e.target.value)} />
            </div>
            <div className='card-input-container-content'>
                <div className='card-input-container cvv'>
                    <label className='input-label'>CVC2/CVV2</label>
                    <Input placeholder={'***'} name='cvv2' value={userData.cvv2} onChange={(e) => handleChange([e.target.name], e.target.value)} />
                </div>
                <div className='card-input-container date-input'>
                    <label className='input-label'>{t('Expiry Date')}</label>
                    <MonthPicker onChange={onChange} placeholder={'mm/yy'} />
                </div>
            </div>
            <div className='paymant-container'>
                <span className='paymant-content'>{t('Total Payment')}:</span>
                <span className='paymant-amount'>{grandtotal} USD</span>
            </div>
            <div className='order-popup-footer second-page-footer'>
                <Button type="primary" onClick={handlePagination}>
                    {t('Previous')}
                </Button>
                <Button key="submit" style={{ display: 'flex' }} type="primary" onClick={buy}>
                    {t('Buy')}
                </Button>
            </div>

        </div>
    )
});
OrderPopupStepTwo.propTypes = {
    grandtotal: PropTypes.number.isRequired,
    handlePagination: PropTypes.func.isRequired,
    buy: PropTypes.func.isRequired,
    setOrderData: PropTypes.func.isRequired,
    userData: PropTypes.object
};
