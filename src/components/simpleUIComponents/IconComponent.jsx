import React from 'react';
import PropTypes from 'prop-types';

const IconComponent = ({ icon }) => {
    return (
        <img src={`${icon}.svg`} alt = {icon} />
    )
};
IconComponent.propTypes = {
    icon: PropTypes.string.isRequired,
};


export default IconComponent;
