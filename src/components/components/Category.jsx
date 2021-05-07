import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLngKey, makePath } from '../../util/helpers';

// eslint-disable-next-line react/display-name
export const Category = memo(({ category, location, lng }) => {
    const { url, id } = category;

    return (
        <Link to={`/${makePath(location)}/${lng}/categories/${id}`} style={{ width: 'fit-content' }}>
            <div className='category-container link'>
                <img src={url} className='category-image' />
                <div className='category-name-container link'>{category[`${getLngKey(lng)}_name`]}</div>
            </div>
        </Link>
    )
});
Category.propTypes = {
    category: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
};
