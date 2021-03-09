import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SocialIcons from './SocialIcons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContactUs from './ContactUs';;
import PropTypes from 'prop-types';


const Footer = ({ newClass, handleChnage }) => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();
    const { lng, location } = useSelector(s => s.globals);
    const [visible, setVisible] = useState(false);
    const close = () => {
        setVisible(false)
    };
    const toogleModal = () => {
        setVisible(true);
        handleChnage();
    };
    return (
        <footer className={`footer-container  ${newClass}`}>
            <SocialIcons
                color='#fff'
                className='footer-icon'
                fromFooter={true}
            />
            <p className='footer-text'>{t('Copyright')} &copy; {year} TouRest.online </p>
            <p className='footer-text'>{t('All Rights Reserved')}.</p>
            <div className='footer-navigation'>
                <Link to={`/${location}/${lng}/about`} className='footer-nav' onClick={() => handleChnage()}>{t('About')}</Link>
                <Link to={`/${location}/${lng}/privacy`} className='footer-nav' onClick={() => handleChnage()}>{t('Privacy policy')}</Link>
                <div className='footer-nav' onClick={() => toogleModal()} >{t('Contact')}</div>
            </div>
            <ContactUs
                visible={visible}
                close={close}
            />
        </footer>
    )
};
Footer.propTypes = {
    newClass: PropTypes.string,
    handleChange: PropTypes.func,
};


export default Footer;