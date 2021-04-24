import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, DatePicker, Button } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react/display-name
export const OrderPopupStepOne = memo(({ userData, setOrderData, handlePagination, startDate, city, lastDate }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        setOrderData(dispatch, 'firstDate', startDate);
        setOrderData(dispatch, 'lastDate', lastDate);
    }, []);
    const handleChange = (name, value) => {
        setOrderData(dispatch, name, value);
    }
    return (
        <div className='orderPopup-content'>
            <div className='input-container'>
                <label className='input-label'>{t('City')}</label>
                <Input disabled value={city} />
            </div>
            <div className='input-container'>
                <label className='input-label'>{t('Full name')}</label>
                <Input name='name' value={userData.name} onChange={(e) => handleChange([e.target.name], e.target.value)} />
            </div>
            <div className='input-container'>
                <label className='input-label'>{t('Email')}</label>
                <Input type='email' name='email' value={userData.email} onChange={(e) => handleChange([e.target.name], e.target.value)} />
            </div>
            <div className='input-container'>
                <label className='input-label'>{t('Confirm email')}</label>
                <Input type='email' name='confirm' value={userData.confirm} onChange={(e) => handleChange([e.target.name], e.target.value)} />
            </div>
            <div className='input-container space-between-input-container'>
                <div className='hotel-input-group'>
                    <label className='input-label'>{t('Hotel')}</label>
                    <Input name='hotel' value={userData.hotel} onChange={(e) => handleChange([e.target.name], e.target.value)} />
                </div>
                <div className='room-input-group'>
                    <label className='input-label'>{t('Room')}</label>
                    <Input name='room' value={userData.room} onChange={(e) => handleChange([e.target.name], e.target.value)} />
                </div>
            </div>
            <div className='input-container space-between-input-container'>
                <div>
                    <label>{t('Tours starting date')}</label>
                    <DatePicker value={moment(startDate)} disabled />
                </div>
                <div>
                    <label>{t('Tours ending date')}</label>
                    <DatePicker value={moment(lastDate)} disabled />
                </div>
            </div>
            <div className='order-popup-footer'>
                <Button type="primary" onClick={handlePagination}>
                    {t('Next')}
                </Button>
            </div>
        </div>
    )
});
OrderPopupStepOne.propTypes = {
    userData: PropTypes.object,
    setOrderData: PropTypes.func.isRequired,
    handlePagination: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    lastDate: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
}
