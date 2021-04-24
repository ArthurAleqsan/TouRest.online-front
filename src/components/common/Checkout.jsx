import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { AMD_Rate } from "../../util/config";
import OrderPopup from "../popup/OrderPopup";

// eslint-disable-next-line react/display-name
export const Checkout = memo(({ subtotal, discount, grandtotal }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const { country } = useSelector((s) => s.globals);
    const isFromArmenia = country == "Armenia";

    return (
        <div className="checkout-container">
            <div className="content-container">
                <p className="header-container">
                    <span>{t("Summary")}</span>
                </p>
                <p className="text-container">
                    <span className="text-container-text">{t("Subtotal")}</span>
                    <span className="text-container-price">
                        {isFromArmenia
                            ? `${subtotal * AMD_Rate} AMD`
                            : `${subtotal} USD`}
                    </span>
                </p>
                {discount && (
                    <p className="text-container">
                        <span className="text-container-text">
                            {t("Discount")}
                        </span>
                        <span className="text-container-price">
                            {isFromArmenia
                                ? `AMD  ${discount * AMD_Rate}`
                                : `USD  ${discount}`}
                        </span>
                    </p>
                )}
                <p className="text-container total-container">
                    <span className="text-container-text">
                        {t("Grand Total")}
                    </span>
                    <span className="text-container-price total">
                        {isFromArmenia ? `${grandtotal * AMD_Rate} AMD` : `${grandtotal} USD`}
                    </span>
                </p>
                <div
                    className="checkout-btn link btn-style"
                    onClick={() => setVisible(true)}
                >
                    {t("Checkout")}
                </div>
            </div>
            <OrderPopup
                visible={visible}
                setVisible={setVisible}
                grandtotal={grandtotal}
            />
        </div>
    );
});
Checkout.propTypes = {
    subtotal: PropTypes.number.isRequired,
    discount: PropTypes.number,
};
