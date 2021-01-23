import React, { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ToursPage from './ToursPage';


// eslint-disable-next-line react/display-name
export const _404_Page = memo(({ headerName, fromToursToday }) => {
    const [t] = useTranslation();
    return (
        <Fragment>
            <div className='cartpage-tours-header-container'>
                <p className='cartpage-tours-header'>{t(headerName)}</p>
                <p className='cartpage-content-header'>{t('Check out these tours')}</p>
            </div>
            <ToursPage headerName={t('Most Popular')} />
        </Fragment>
    )
});
_404_Page.propTypes = {
    headerName: PropTypes.string.isRequired,
    fromToursToday: PropTypes.bool,
}
