import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import TitleComponent from './TitleComponent';
import { useTranslation } from 'react-i18next';


// eslint-disable-next-line react/display-name
export const WithTitle = memo((props) => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <TitleComponent title={t(props.title)} />
            {props.children}
        </Fragment>
    );
});

WithTitle.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object.isRequired,
}