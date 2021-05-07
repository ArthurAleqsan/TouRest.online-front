import React,{useState} from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import IconComponent from "../simpleUIComponents/IconComponent";

const ResponsiveTabs = ({ location, lng }) => {
    console.log(location);
    const [activeHeader,setActiveHeader] = useState('Most Popular');
    const { t } = useTranslation();
    const { SubMenu } = Menu;
    return (
        <div className="responsive-tab">
            <Menu
                mode="inline"
                expandIcon={<img src={"/assets/images/icons/menu.svg"} />}
               
                
            >
                <SubMenu title={activeHeader == 'Most Popular' ? t('Most Popular') : activeHeader} >
                    <Menu.Item>
                        <Link to={"/"}>
                            <div className="tab" >
                                <div
                                    className="tab-icon"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        color: "#33b7c9",
                                    }}
                                >
                                    <IconComponent icon="star" />
                                </div>
                                <span className="tabs-name"> {t("Most Popular")}</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={`/${location}/${lng}/tours-today`}>
                            <div className="tab" onClick={()=>setActiveHeader('Tours Today')}>
                                <div
                                    className="tab-icon"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        color: "#33b7c9",
                                    }}
                                >
                                    <IconComponent icon="timetable" />
                                </div>
                                <span className="tabs-name">{t("Tours Today")}</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={`/${location}/${lng}/categories`}>
                            <div className="tab">
                                <div
                                    className="tab-icon"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        color: "#33b7c9",
                                    }}
                                >
                                    <IconComponent icon="list" />
                                </div>
                                <span className="tabs-name"> {t("Tours by Category")}</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={`/${location}/${lng}/vip-tours`}>
                            <div className='tab'>
                          <span className="tabs-name"> {t("VIP Tours")}</span> 
                          </div>
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

ResponsiveTabs.propTypes = {};

export default ResponsiveTabs;
