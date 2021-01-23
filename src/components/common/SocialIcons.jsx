import React from 'react';
import PropTypes from 'prop-types';



const SocialIcons = ({ color, className, fromFooter }) => {
    return (
        <div className={`social-container ${className}`}>
            <div className='icon-container link' style={{ width: 25, height: 25, color }}>
                <a href='https://www.facebook.com/TouRest.online/' target="_blank" rel="noopener noreferrer" >
                    {!fromFooter ? <img src='/assets/images/icons/fbIcon.svg' alt='fb-icon' /> : <img src='/assets/images/icons/fbIconWhite.svg' alt='fb-icon' />}
                </a>
            </div>
            <div className='icon-container link' style={{ width: 25, height: 25, color }}>
                <a href='https://vk.com/tourest.online' target="_blank" rel="noopener noreferrer" >
                    <img src='/assets/images/icons/vk.svg' alt='vk-icon' />
                </a>
            </div>
            <div className='icon-container link' style={{ width: 25, height: 25, color }}>
                <a href='https://www.instagram.com/tourest_online/' target="_blank" rel="noopener noreferrer" >
                    {!fromFooter ? <img src='/assets/images/icons/ig.svg' alt='instagram-icon' /> : <img src='/assets/images/icons/igWhite.svg' alt='instagram-icon' />}
                </a>
            </div>
        </div>
    )
};
SocialIcons.propTypes = {
    color: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    fromFooter: PropTypes.bool,
};
export default SocialIcons;