import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { capitalizeFirstLetter } from "../../util/helpers";
import {
    setLng,
    resetImagesArr,
    setLocation,
    getCountryCode,
} from "../../store/global/global.actions";

import SocialIcons from "./SocialIcons";
import { CityPopup } from "./../popup/CityPopup";
import { resetCategories } from "../../store/categories/categories.actions";
import { setOrderData } from "../../store/order/order.actions";
import IconComponent from "../simpleUIComponents/IconComponent";

const Header = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();

    const dispatch = useDispatch();
    const { lng, location, cities } = useSelector((s) => s.globals);

    const [activetab, setActive] = useState(lng);
    const [visibleModal, setVisibleModal] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const [visible, setVisible] = useState(false);
    const handleSelectLng = (lng) => {
        let newPath = "";
        const isBasicPath = window.location.pathname.split("/").length > 2;
        setLng(dispatch, lng);
        i18n.changeLanguage(lng);
        if (isBasicPath) {
            const slicedURLArray = window.location.pathname
                .split("/")
                .slice(3, window.location.pathname.split("/").length);
            newPath = slicedURLArray.join("/");
            window.location.search
                ? history.push(
                      `/${location}/${lng.toLowerCase()}/${
                          newPath + window.location.search
                      }`
                  )
                : history.push(`/${location}/${lng.toLowerCase()}/${newPath}`);
        } else {
            history.push(`/${location}/${lng.toLowerCase()}`);
        }
        setActive(lng);
    };
    const toogleList = () => {
        if (width <= 1280) {
            setVisibleModal(true);
        }
        if (width > 1280) {
            setVisibleModal(false);
        }
    };
    const handleResetImages = () => {
        resetImagesArr(dispatch);
    };
    return (
        <header className="header">
            <div className="header-logo-container">
                <Link to="/" onClick={handleResetImages}>
                    <img
                        className="logo"
                        src={"/assets/images/logo.png"}
                        alt="TouRest.online"
                    />
                </Link>
            </div>
            <div className="header-rigth-container">
                <div
                    className="header-social-icons-conatiner"
                    style={{ display: width > 1280 ? "flex" : "none" }}
                >
                    <SocialIcons className="header-social-icons" color="#000" />
                </div>
                <div
                    className="header-content city-container link"
                    onClick={() => setVisible(true)}
                    style={{ display: width > 1280 ? "flex" : "none" }}
                >
                    <div className="header-content-tab">
                        {t(capitalizeFirstLetter(location))}
                        <div className="header-content-border-bottom"></div>
                    </div>
                </div>

                <CityPopup
                    visible={visible}
                    setVisible={setVisible}
                    cities={cities}
                    setCity={setLocation}
                    resetCategories={resetCategories}
                    setOrderData={setOrderData}
                />
                <div
                    className="header-content left link"
                    style={{ display: width > 1280 ? "flex" : "none" }}
                >
                    {/* <div className='header-content-tab' style={{ display: width > 1280 ? 'flex' : 'none' }}>
                        <Link className='link' to={`/${location}/${lng}/taxi`}>{t('Taxi')}</Link>
                        <div className='header-content-border-bottom'></div>
                    </div> */}
                    <div
                        className="header-content-tab"
                        style={{ display: width > 1280 ? "flex" : "none" }}
                    >
                        <Link className="link" to={`/${location}/${lng}/blog`}>
                            {t("Blog")}
                        </Link>
                        <div className="header-content-border-bottom"></div>
                    </div>
                    <div
                        className="header-content-tab"
                        style={{ display: width > 1280 ? "flex" : "none" }}
                    >
                        <Link className="link" to={`/${location}/${lng}/cart`}>
                            {t("Cart")}
                        </Link>
                        <div className="header-content-border-bottom"></div>
                    </div>

                    <div
                        className="header-content language-container link"
                        style={{ display: width > 1280 ? "flex" : "none" }}
                    >
                        <div
                            className={`lng-container  ${
                                lng === "Eng" ? "lng-eng" : "lng-arm"
                            }`}
                            style={{ display: width > 1280 ? "flex" : "none" }}
                        >
                            <div className="header-content-tab">
                                <p
                                    onClick={() => handleSelectLng("Eng")}
                                    className={
                                        activetab === "Eng" ? "active" : ""
                                    }
                                >
                                    {t("Eng")}
                                </p>
                                <div className="header-content-border-bottom"></div>
                            </div>
                            <div className="border"></div>
                            <div className="header-content-tab">
                                <p
                                    onClick={() => handleSelectLng("Rus")}
                                    className={
                                        activetab === "Rus" ? "active" : ""
                                    }
                                >
                                    {t("Rus")}
                                </p>
                                <div className="header-content-border-bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="header-menu-container link"
                onClick={() => toogleList()}
            >
                <a className="header-menu-icon">
                    <div
                        className="header-icon"
                        style={{ width: 30, height: 30, color: "#000" }}
                    >
                        <img src="/assets/images/icons/menu.svg" />
                    </div>
                </a>
            </div>
            {/* {width <= 1280 && <HeaderModal
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
                cities={cities}
                setCity={() => setLocation(dispatch)}
                resetCategories={resetCategories}
                lng={lng}
                setLng={setLng}
                city={location}
            />} */}
            <div className="user-icon-container"></div>
        </header>
    );
};

export default Header;
