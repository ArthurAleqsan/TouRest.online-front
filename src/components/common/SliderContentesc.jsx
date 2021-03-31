import React, { memo } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const SliderContentDesc = memo(({ header, text }) => {
    // const { header, text } = desc;
    return (
        <div className="content-container">
            <div className="sliderText-container">
                <div className="header-container">About</div>
                <div className="text-container">
                    Discover the sea life and coral reefs around Tiran Island on
                    a full-day boat trip from Sharm el Sheikh. Begin with
                    stress-free complimentary transportation from your hotel to
                    the boat. Explore the reefs using provided snorkeling and
                    scuba equipment. Divers enjoy the company of an instructor,
                    along with an underwater photographer. In between water
                    excursions, have a provided lunch on board the boat with
                    unlimited drinks
                </div>
            </div>
        </div>
    );
});
SliderContentDesc.propTypes = {
    // desc: PropTypes.object.isRequired,
};

export default SliderContentDesc;
