import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const TitleComponent = ({ title }) => {
    const defaultTitle = 'TouRest.online';
    return <Helmet>
        <title>{title ? title : defaultTitle}</title>
    </Helmet>
};
TitleComponent.propTypes = {
    title: PropTypes.string,
};
export default TitleComponent;
