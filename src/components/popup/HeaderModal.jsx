import React, { useState } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { makePath, capitalizeFirstLetter }  from './../../util/helpers';
import { useTranslation } from 'react-i18next';
import Footer from '.././common/Footer';


const HeaderModal = ({ visibleModal, setVisibleModal, cities, setCity, resetCategories, history, lng, setLng, city }) => {
    const { t } = useTranslation();
    const [activetab, setActive] = useState(lng);
    const handleSelectCity = (city) => {
        const location = makePath(city);
        setCity(location);
        setVisibleModal(!visibleModal);
        sessionStorage.setItem('city', JSON.stringify(location));
        resetCategories();
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
                        <Link className='link' to={`/${city}/${lng}/taxi`} onClick={() => setVisibleModal(false)}>{t('Taxi')}</Link>
                    </div>
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
                <div
                    className='header-modal-social-icons-conatiner'
                >
                    <Footer
                        newClass='header-modal-footer'
                        handleChnage={() => setVisibleModal(false)}
                    />
                </div>
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
};

export default withRouter(HeaderModal);