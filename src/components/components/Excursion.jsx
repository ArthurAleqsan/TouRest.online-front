import React, { memo, Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Rate, Carousel } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { getLngKey, makeRoundedRate } from "../../util/helpers";
import { AMD_Rate } from "../../util/config";
import IconComponent from "../simpleUIComponents/IconComponent";

// eslint-disable-next-line react/display-name
const Excursion = memo(
    ({
        location,
        tour,
        disabled,
        handleClick,
        openTourPage,
        fromCart,
        lng,
        openImageModal,
    }) => {
        const [t] = useTranslation();
        const { country } = useSelector((s) => s.globals);
        const isFromArmenia = country == "Armenia";

        const {
            en_name: name,
            category,
            rate,
            priceForAdults,
            priceForChildren,
        } = tour;

        const carousel = useRef(null);
        const [index, setIndex] = useState(0);
        const handleChange = () => {
            setIndex(index + 1);
        };
        return (
            <Fragment>
                <div className="tours-container-slider">
                    <Carousel
                        afterChange={() => handleChange()}
                        className="carousel-container"
                        ref={carousel}
                        autoplay={fromCart}
                        dotPosition={"top"}
                    >
                        {tour.images &&
                            tour.images.map((img) => {
                                return (
                                    <div
                                        key={img}
                                        className="tours-container-slider-image"
                                        onClick={() =>
                                            openImageModal(tour.images)
                                        }
                                    >
                                        <img
                                            className="image"
                                            src={img}
                                            alt={img}
                                        />
                                    </div>
                                );
                            })}
                    </Carousel>
                </div>
                <div className="tours-container-info">
                    <div className="single-excursion-container">
                        <div className="desc-column" onClick={openTourPage}>
                            <p className="excursion-name">
                                {tour[`${getLngKey(lng)}_name`]}
                            </p>
                            <p className="excursion-desc-str">
                                <span className="excursion-desc-span">
                                    {t("Category")} :{" "}
                                </span>
                                <span className="excursion-category-name">
                                    {" "}
                                    {category[`${getLngKey(lng)}_name`]}
                                </span>
                            </p>
                            <p className="excursion-desc-str">
                                <span className="excursion-desc-span">
                                    {t(
                                        priceForAdults
                                            ? "Cost for Adults"
                                            : "Starting From"
                                    )}{" "}
                                    :{" "}
                                </span>
                                <span className="excursion-price">
                                    {" "}
                                    {isFromArmenia
                                        ? `${+priceForAdults * AMD_Rate}֏`
                                        : `${priceForAdults}$`}
                                </span>
                            </p>
                            {tour.priceForChildren !== 0 && (
                                <p className="excursion-desc-str">
                                    <span className="excursion-desc-span">
                                        {t("Cost for Children")} :{" "}
                                    </span>
                                    <span className="excursion-price">
                                        {" "}
                                        {isFromArmenia
                                            ? `${+priceForChildren * AMD_Rate}֏`
                                            : `${priceForChildren}$`}
                                    </span>
                                </p>
                            )}
                            {fromCart ? (
                                <div className="excursion-desc-str-cartpage">
                                    <span className="excursion-desc-span">
                                        {t("Ticket count for adults")} :{" "}
                                    </span>
                                    <span className="excursion-price">
                                        {" "}
                                        {tour.peopleCount}
                                    </span>
                                </div>
                            ) : (
                                <div className="excursion-desc-str">
                                    <Rate
                                        
                                        value={makeRoundedRate(rate)}
                                        disabled={disabled}
                                    />
                                </div>
                            )}
                            {fromCart && tour.childCount !== 0 && (
                                <div className="excursion-desc-str-cartpage">
                                    <span className="excursion-desc-span">
                                        {t("Ticket count for children")} :{" "}
                                    </span>
                                    <span className="excursion-price">
                                        {" "}
                                        {tour.childCount}
                                    </span>
                                </div>
                            )}
                            {fromCart && (
                                <Fragment>
                                    <div className="excursion-desc-str-cartpage">
                                        <span className="excursion-desc-span">
                                            {t("Tour is starting at")} :{" "}
                                        </span>
                                        <span className="excursion-price">
                                            {" "}
                                            {moment(
                                                new Date(tour.firstDate)
                                            ).format("DD/MM - HH:mm")}
                                        </span>
                                    </div>
                                    <div className="excursion-desc-str-cartpage">
                                        <span className="excursion-desc-span">
                                            {t("Tour duration")} :{" "}
                                        </span>
                                        <span className="excursion-price">
                                            {" "}
                                            {isNaN(+tour.duration)
                                                ? tour.duration
                                                : `${Math.round(tour.duration / 60 / 60 / 1000)} hour`}
                                        </span>
                                    </div>
                                </Fragment>
                            )}
                            <div className="excursion-desc-str ">
                                {fromCart ? (
                                    <button
                                        className={
                                            "remove-btn link btn btn-style"
                                        }
                                        onClick={handleClick}
                                    >
                                        {t("Remove")}
                                    </button>
                                ) : (
                                    <Link
                                        to={`${location}/${lng}/tour-booking`}
                                    >
                                        <button className="btn link btn-style">
                                            {t("Add to cart")}
                                        </button>
                                    </Link>
                                )}
                            </div>
                            {!fromCart && (
                                <div className="excursion-desc-str">
                                    <div
                                        style={{
                                            width: 15,
                                            color: "#000",
                                        }}
                                    >
                                        <IconComponent icon="compass" />
                                    </div>
                                    <span className="excursion-desc-span link">
                                        {" "}
                                        {t("See More")}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
);

Excursion.propTypes = {
    tour: PropTypes.object.isRequired,
    location: PropTypes.string,
    count: PropTypes.string,
    lng: PropTypes.string,
    path: PropTypes.string,
    disabled: PropTypes.bool,
    fromCart: PropTypes.bool,
    openTourPage: PropTypes.func,
    handleClick: PropTypes.func,
    openImageModal: PropTypes.func,
};

export default Excursion;
