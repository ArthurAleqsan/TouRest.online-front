import React, { memo } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
export const HoverBox = memo((props) => {
    const { imagePath, fadeIn } = props;
    return (
        <div className="hoverbox-content link">
            <div className="hoverbox-content-overlay">
                <img
                    className="hoverbox-content-image"
                    src={imagePath}
                />
            </div>
            <div className={`hoverbox-content-details ${fadeIn}`}>
                <div>{props.children}</div>
            </div>
        </div>
    )
});
HoverBox.propTypes = {
    imagePath: PropTypes.string.isRequired,
    fadeIn: PropTypes.string.isRequired,
};