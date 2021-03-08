import React, { useState } from 'react';
import { useStore, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Collapse, Rate, message, Modal } from 'antd';
import { addToCart } from '../../store/tours/tours.actions';
import { resetOrderData } from '../../store/order/order.actions';
import SuccessFailContainer from '../popup/SuccessFailContainer';
import { AMD_Rate } from '../../util/config';
import IconComponent from '../simpleUIComponents/IconComponent';
import SelectBox from '../common/SelectBox';

const TourBookingComponent = ({ singleTour }) => {
    const { lng } = useSelector(s => s.globals);
    const { orderData } = useSelector(s => s.orders);
    const dispatch = useDispatch();
    const { getState } = useStore();
    const { t } = useTranslation();
    const [visibleModal, setVisibleModal] = useState(false);
    const [isSuccess, toggleIsSuccess] = useState(false);
    // destructuring
    const { country } = useSelector(s => s.globals);
    const isFromArmenia = country == 'Armenia';
    const lngPrefix = lng === 'Eng' ? 'en' : 'ru';
    console.log(singleTour);

    const startTime = moment(new Date(singleTour.startDateAndTime)).format('HH mm');
    const languages = singleTour.languages;
    const duration = Math.round(singleTour.duration / 60 / 60 / 1000);
    const { Panel } = Collapse;

    const [selectBoxData, setSelectBoxData] = useState({
        childCount: orderData.childCount,
        peopleCount: orderData.peopleCount,
        firstDate: orderData.firstDate,
    });

    const addingToCart = () => {
        if (!orderData.firstDate) {
            toggleIsSuccess(false)
            setVisibleModal(true)
        }
        else {
            toggleIsSuccess(true)
            setVisibleModal(true);
        }
        addToCart(dispatch, getState, { ...singleTour, ...selectBoxData });
        resetOrderData(dispatch);
        setSelectBoxData({ childCount: 0, peopleCount: 1, firstDate: '' });
    };
    const handleClick = () => {
        setVisibleModal(false);
    };
    return (
        <div className='collapse-container'>

            <div className='right-column'>
                <div className='right-column-desc '>
                    <div className='right-column-header header-text '>{t('Overview')}</div>
                    <div className='right-column-text '>{singleTour[`overview${lngPrefix}_description`]}
                    </div>
                </div>
                <div className='right-column-activity'>
                    <div className='activity-header header-text'>{t('About this activity')}</div>
                    <div className='activity-content'>
                        <div style={{ width: 15, height: 15, color: '#000' }}>
                            <IconComponent icon='time' />
                        </div>
                        <div className='activity-content-desc'>
                            {t('Start at')}: {startTime} 
                        </div>
                    </div>
                    <div className='activity-content'>
                        <div style={{ width: 15, height: 15, color: '#000' }}>
                            <IconComponent icon='time' />
                        </div>
                        <div className='activity-content-desc'>{t('Duration')}: {duration} {t('hour')}</div>
                    </div>
                    <div className='activity-content'>
                        <div style={{ width: 15, height: 15, color: '#000' }}>
                            <IconComponent icon='locate-user' />
                        </div>
                        <div className='activity-content-desc'>{t('Live tour guide')}</div>
                    </div>
                    <div className='activity-content'>
                        <div style={{ width: 15, height: 15, color: '#000' }}>
                            <IconComponent icon='chat' />
                        </div>
                        <div className='activity-content-desc'>{languages}</div>
                    </div>
                    <div className='activity-content'>
                        <div style={{ width: 15, height: 15, color: '#000' }}>
                            <IconComponent icon='bus1' />
                        </div>
                        <div className='activity-content-desc'>{t('Pick-up from your hotel')}</div>
                    </div>
                    <div className='activity-content'>
                        <div style={{ width: 15, height: 15, color: '#000' }}>
                            <IconComponent icon='cancel' />
                        </div>
                        <div className='activity-content-desc'>{t('Free-cancelation-24-hours-before')} </div>
                    </div>
                </div>
                <div className='right-column-collapse '>
                    <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition={"right"}
                        bordered={false}
                    >
                        {singleTour[`${lngPrefix}_highlights`] && <Panel header={t('Highlights')} key='1'>
                            <div>
                                {singleTour[`${lngPrefix}_highlights`].map(highlight => (
                                    <ul key={highlight}>
                                        <li>{highlight}</li>
                                    </ul>
                                ))}
                            </div>
                        </Panel>}
                        <Panel header={t('Full Description')} key='2'>
                            <div>{singleTour[`${lngPrefix}_fullDescription`]}</div>
                        </Panel>

                        {singleTour[`${lngPrefix}_includes`] && <Panel header={t('Includes')} key='3'>
                            <div>{singleTour[`${lngPrefix}_includes`].map(include => (
                                <ul key={include}>
                                    <li>{include}</li>
                                </ul>
                            ))}
                            </div>
                        </Panel>}
                        {singleTour[`${lngPrefix}_notSuitable`] && <Panel header={t('Not suitable for')} key='4'>
                            <div>
                                {singleTour[`${lngPrefix}_notSuitable`].map(notsutibale => (
                                    <ul key={notsutibale}>
                                        <li>{notsutibale}</li>
                                    </ul>
                                ))}
                            </div>
                        </Panel>}
                        {singleTour[`${lngPrefix}_prepareThings`] && <Panel header={t('How to prepare')} key='5'>
                            <div>
                                {singleTour[`${lngPrefix}_prepareThings`].map(thing =>
                                    <ul key={thing}>
                                        <li>{thing}</li>
                                    </ul>
                                )}

                            </div>
                        </Panel>}
                    </Collapse>
                </div>
            </div>
            <div className='left-column'>
                <div className='left-column-info-container'>
                    <p>
                        <span className='left-column-name'>{t('For Adults Starting from')} :</span>
                        <span className='left-column-text' > {isFromArmenia ? `${singleTour.priceForAdults * AMD_Rate}֏`: `${singleTour.priceForAdults}$`}</span>
                    </p>
                    {singleTour.priceForChildren && <p>
                        <span className='left-column-name'>{t('For Childs Starting from')} :</span>
                        <span className='left-column-text' > {isFromArmenia ? `${singleTour.priceForChildren * AMD_Rate}֏`: `${singleTour.priceForChildren}$`}</span>
                    </p>}
                    <p>
                        <span className='left-column-name'>{t('Tour name')}:</span>
                        <span className='left-column-text'> {t(`${singleTour[`${lngPrefix}_name`]}`)}</span>
                    </p>
                </div>
                <div className='left-column-selectBox'>

                    <SelectBox
                        peopleMaxCount={5}
                        language={'eng'}
                        handleSelect={() => addingToCart()}
                        handlerChange={setSelectBoxData}
                        defaultSelectBoxValues={selectBoxData}
                        hasChildPrise={singleTour.priceForChildren}
                        aviableDays={singleTour.availableDates}
                    />
                </div>
            </div>
        

            <SuccessFailContainer
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
                handleClick={() => handleClick()}
                isFromCartPage={false}
                isSuccess={isSuccess}
            />
        </div>
    )
};

TourBookingComponent.propTypes = {
    singleTour: PropTypes.object.isRequired
};

export default TourBookingComponent;
