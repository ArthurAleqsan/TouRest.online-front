import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Modal, Carousel, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { isEmail, isValidCardHolderName, isValidCardNo, isValidCVV2, isValidObject } from '../../util/helpers';
import { checkout, setOrderData } from '../../store/order/order.actions';
import { OrderPopupStepOne } from '../common/orderPopup/OrderPopupStepOne';
import { OrderPopupStepTwo } from '../common/orderPopup/OrderPopupStepTwo';
import SuccessFailContainer from './SuccessFailContainer';

const OrderPopup = ({ visible, setVisible, grandtotal }) => {
    const { t } = useTranslation();
    const { cartToursArray } = useSelector(s => s.tours);
    const { userData } = useSelector(s => s.order);
    const [visibleModal, setVisibleModal] = useState(false);
    const [isSuccess, setBool] = useState(false);
    const carousel = useRef(null);
    const [step, setStep] = useState(0);
    const handleChange = () => {
        step === 0 ? setStep(1) : setStep(0);
    }
    const startingDates = []
    const endingDates = [];
    for (let i = 0; i < cartToursArray.length; i++) {
        startingDates.push(new Date(cartToursArray[i].firstDate).toUTCString());
        const startTime = new Date(cartToursArray[i].firstDate).getTime();
        const duration = parseFloat(cartToursArray[i].duration) * 60 * 60;
        endingDates.push(new Date(startTime + duration).toUTCString());
    }
    const sortedStartDates = startingDates.sort((a, b) => {
        const f = new Date(a);
        const l = new Date(b);
        return f - l;
    });
    const sortedLastDates = endingDates.sort((a, b) => {
        const f = new Date(a);
        const l = new Date(b);
        return f - l;
    });
    const handleClick = () => {
        setVisibleModal(false);
    };
    const handlePagination = () => {

        if (step === 0) {

            if (!isValidObject({
                name: userData.name,
                email: userData.email,
                hotel: userData.hotel,
                room: userData.room,
                firstDate: sortedStartDates[0],
                lastDate: sortedLastDates[sortedLastDates.length - 1],
            })) return message.error(t('Please fill all required fileds'));
            if (userData.email !== userData.confirm) return message.error(t('Please confirm Your email'));
            if (!isEmail(userData.email)) return message.error(t('Please fill valid email'));
            
            carousel.current.next();
        } else {
            carousel.current.prev();
        }
    };
    const buy = () => {
        if (!isValidCardHolderName(userData.cardholderCard)) return message.error(t('Cardholder Name is not a valid'));
        const cardNumber = userData.cardNumber.split(' ').join('');
        if (cardNumber.length !== 16) return message.error(t('Card numbers must be a 16 char'));
        if (!isValidCardNo(cardNumber)) return message.error(t('Card numbers must be a digits'));
        if (!isValidCVV2(userData.cvv2)) return message.error(t('CVV must be a 3 digits'));
        if (isValidObject({ ...userData, childCount: '' + userData.childCount, })) {
            checkout(userData);
            setBool(true);
        } else {
            console.log(userData);
            setBool(false);
        }

        setVisibleModal(true);
    }
    return (
        <div className='order-popup-container'>
            <Modal
                visible={visible}
                closable={false}
                onCancel={() => setVisible(false)}
                className={'orderPoup-modal'}
                footer={null}
                centered={true}
                maskStyle={{ background: 'rgba(0, 0, 0, 0.95)' }}
            >
                <Carousel
                    afterChange={handleChange}
                    className='carousel-container'
                    ref={carousel}
                    dots={false}
                >
                    <OrderPopupStepOne
                        userData={userData}
                        city={cartToursArray[0].city}
                        setOrderData={setOrderData}
                        handlePagination={handlePagination}
                        startDate={sortedStartDates[0]}
                        lastDate={sortedLastDates[sortedLastDates.length - 1]}
                    />
                    <OrderPopupStepTwo
                        userData={userData}
                        grandtotal={grandtotal}
                        setOrderData={setOrderData}
                        handlePagination={handlePagination}
                        buy={buy}
                    />
                </Carousel>
            </Modal>

            <SuccessFailContainer
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
                handleClick={() => handleClick()}
                isFromCartPage={false}
                isSuccess={isSuccess}
                text={isSuccess ? 'Ordered is done' : 'Something is wrong'}
            />
        </div>
    )
}
OrderPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    grandtotal: PropTypes.any.isRequired,
};

export default OrderPopup;