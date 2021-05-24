import React, { useState } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { makePath, capitalizeFirstLetter } from './../../util/helpers';
import { useTranslation } from 'react-i18next';
import Footer from '.././common/Footer';
import { useDispatch } from 'react-redux';


const HeaderModal = ({ visibleModal, setVisibleModal, cities, setCity, resetCategories, history, lng, setLng, city, setOrderData }) => {
    const { t } = useTranslation();
    const [activetab, setActive] = useState(lng);
    const dispatch = useDispatch();

    const handleSelectCity = (city) => {
        console.log(city);
        const location = makePath(city);
        console.log(location);
        sessionStorage.setItem("city", JSON.stringify(location));
        setCity(dispatch, location);
        setVisibleModal(!visibleModal);
        resetCategories(dispatch);
        setOrderData(dispatch, "city", city);
        history.push(`/${location}`);
    };
    const handleSelectLng = (lng) => {
        let newPath = '';
        const isBasicPath = window.location.pathname.split('/').length > 2;
        setLng(lng);
        // i18n.changeLanguage(lng);
        if (isBasicPath) {
            const slicedURLArray = (window.location.pathname.split('/')).slice(3, window.location.pathname.split('/').length);
            newPath = slicedURLArray.join('/');
            window.location.search ? history.push(`/${location}/${lng.toLowerCase()}/${newPath + window.location.search}`) : history.push(`/${location}/${lng.toLowerCase()}/${newPath}`);
        } else {
            history.push(`/${location}/${lng.toLowerCase()}`);
        }
        setActive(lng);
        setVisibleModal(false);

    };

    return (
        <div>
            <Modal
                visible={visibleModal}
                setVisible={setVisibleModal}
                footer={null}
                onCancel={() => setVisibleModal(false)}
                className={'modal-conatiner'}
                style={{ width: window.innerWidth }}
                title={<img src={"/assets/images/logo.png"} />}
            >
                <div className='modal-city-container'>
                    {cities.map(city => (
                        <div key={city} className='city link' onClick={() => handleSelectCity(city)}>
                            {t(capitalizeFirstLetter(city))}
                        </div>
                    ))}
                </div>
                <div className='modal-body-container'>
                    <div className='header-content-tab' >
                        <Link className='link' to={`/${city}/${lng}/blog`} onClick={() => setVisibleModal(false)}>{t('Blog')}</Link>
                        <div className='header-content-border-bottom'></div>
                    </div>
                    <div className='header-content-tab'>
                        <Link className='link' to={`/${city}/${lng}/cart`} onClick={() => setVisibleModal(false)}>{t('Cart')}</Link>
                    </div>
                </div>  <div
                    className='header-content language-container link'
                >
                    <div className={`lng-container`}
                    >
                        <div className='header-content-tab link'>
                            <p onClick={() => handleSelectLng('Eng')}
                                className={activetab === 'Eng' ? 'active' : ''}
                            >{t('Eng')}</p>
                        </div>
                        <div className='header-content-tab link'>
                            <p onClick={() => handleSelectLng('Rus')}
                                className={activetab === 'Rus' ? 'active' : ''}
                            >{t('Rus')}</p>
                        </div>
                    </div>

                </div>
                <Footer
                    newClass='header-modal-footer'
                    handleClick={() => setVisibleModal(false)}
                />
            </Modal>
        </div>)
};

HeaderModal.propTypes = {
    visibleModal: PropTypes.bool.isRequired,
    setVisibleModal: PropTypes.func.isRequired,
    cities: PropTypes.array,
    setCity: PropTypes.func,
    resetCategories: PropTypes.func,
    history: PropTypes.object,
    lng: PropTypes.string,
    setLng: PropTypes.func,
    city: PropTypes.string,
};

export default withRouter(HeaderModal);