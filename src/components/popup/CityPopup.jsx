import React, { memo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makePath } from "../../util/helpers";

// eslint-disable-next-line react/display-name
export const CityPopup = memo(
    withRouter(
        ({
            visible,
            setVisible,
            cities,
            setCity,
            resetCategories,
            setOrderData,
        }) => {
            const { t } = useTranslation();
            const dispatch = useDispatch();
            const history = useHistory();
            const handleSelectCity = (city) => {
                const location = makePath(city);
                setCity(dispatch, location);
                setVisible(!visible);
                sessionStorage.setItem("city", JSON.stringify(location));
                resetCategories(dispatch);
                setOrderData(dispatch, "city", city);
                history.push(`/${location}`);
            };
            return (
                <div className="modal-container">
                    <Modal
                        visible={visible}
                        footer={null}
                        closable={false}
                        onCancel={() => setVisible(false)}
                        centered={true}
                        className={"city-modal"}
                        maskStyle={{ background: "rgba(0, 0, 0, 0.75)" }}
                        maskClosable={false}
                    >
                        <div className="modal-header-container">
                            <p className="modal-header">
                                {t("Welcome to TouRest.online")}
                            </p>
                            <p className="modal-header-text">
                                {t("Please choose the location")}
                            </p>
                        </div>
                        <div className="modal-btn-container">
                            {cities.map((city) => (
                                <div
                                    key={city}
                                    className="modal-button link"
                                    onClick={() => handleSelectCity(city)}
                                >
                                    {t(city)}
                                </div>
                            ))}
                        </div>
                    </Modal>
                </div>
            );
        }
    )
);

CityPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    setCity: PropTypes.func.isRequired,
};
