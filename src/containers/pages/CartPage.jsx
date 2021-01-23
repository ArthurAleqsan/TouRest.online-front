import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { _404_Page } from './_404_Page';
import { AMD_Rate } from '../../util/config';

const CartPage = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [tourImages, setTourImages] = useState([]);
    const { country, lng, location } = useSelector(s => s.globals);
    const { cartToursArray } = useSelector(s => s.tours);
    const isFromArmenia = country == 'Armenia';

    let total = 0;
    let discount = 0;
    const remove = (name, id) => {
        removeFromCart(id);
        setVisibleModal(true);
    };
    const handleClick = () => {
        setVisibleModal(false);
    };
    const openImageModal = (images) => {
        setVisible(true);
        setTourImages(images);
    };
    return (
        <div className={`cartpage-container${cartToursArray.length === 0 ? ' tours' : ''}`}>

            <div className='cartpage-header'> {t('Cart')}</div>
            {cartToursArray.length === 0 
                ?  <_404_Page headerName = 'Your cart is empty' />
                : (<div className='cartpage-content'>
                    <div className='left-column'>
                        <div className='left-column-content'>
                            {cartToursArray && cartToursArray.map(tour => {
                                console.log(tour.id);
                                total += tour.transactionTemplate.data.costForChildren ? tour.childCount * tour.transactionTemplate.data.costForChildren + tour.peopleCount * tour.transactionTemplate.data.costForAdults : tour.peopleCount * tour.transactionTemplate.data.costForAdults;
                                return (<div key={tour.id} className='tour-container' >
                                    {/* <Excursion
                                        key={tour.id}
                                        tour={tour}
                                        fromCart={true}
                                        lng={lng}
                                        handleClick={() => remove(tour.name, tour.id)}
                                        openImageModal={openImageModal}
                                        disabled={false}
                                        location={location}
                                    />
                                    <ImageSliderPopup visible={visible} toggleVisibility={() => setVisible(false)} imagesPathArr={tourImages} /> */}
                                </div>)
                            }
                            )}
                        </div>
                        <div className='left-column-footer'>
                            <p className='footer-elements text'>{t('Total')}</p>
                            <p className='footer-elements amount'>{isFromArmenia ? `AMD ${total * AMD_Rate}` : `USD ${total}`}</p>
                        </div>
                    </div>
                    <div className='right-column'>
                        {/* <Checkout
                            subtotal={total}
                            grandtotal={discount ? total : (total - discount)}
                        /> */}
                    </div>
                </div>)
            }
            {/* <SuccessFailContainer
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
                handleClick={() => handleClick()}
                isFromCartPage={true}
                isSuccess={true}
            /> */}
        </div>
    )
};

export default CartPage;
