import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { resetImagesArr } from "../../store/global/global.actions";
import IconComponent from "../simpleUIComponents/IconComponent";

const Tabs = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { lng, location } = useSelector((s) => s.globals);
    const splitedKeysOfPathName = window.location.pathname.split("/");
    const pathName = splitedKeysOfPathName[3];
    let page;
    switch (pathName) {
        case "tours-today":
            page = "toursToday";
            break;
        case "categories":
            page = "category";
            break;
        case "vip-tours":
            page = "vipTours";
            break;
        default:
            page = "mostPopulars";
    }
    const [activeTab, setActive] = useState(page);
    const [activeHeader, setActiveHeader] = useState("Most Popular");
    const [activeIcon, setActiveIcon] = useState("star");
    const [isVisibleDisplay, toogleVisiblilityDisplay] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
    const toogleList = () => {
        if (width > 800) {
            toogleVisiblilityDisplay(true);
        }
        toogleVisiblilityDisplay(!isVisibleDisplay);
    };
    const handleTabClick = (cb, activeTab, selectedIcon) => {
        resetImagesArr(dispatch);
        cb();
        toogleVisiblilityDisplay(!isVisibleDisplay);
        setActiveHeader(activeTab);
        setActiveIcon(selectedIcon);
    };
    return (
        <div className='tabs'>
        <div className='tabs-container'>
            {width <= 800 && <div className='responsive-tab-container' style={{ height: '100' }}>
                <div className='tab-icon' style={{ width: 25, height: 25, color: '#33b7c9' }}>
                    {activeHeader !== 'Vip Tours' && <IconComponent icon={`${activeIcon}`} />}
                </div>
                <div className='tab-name'>
                    <span className='tabs-name'>{activeHeader == 'Most Popular' ? t('Most Popular') : activeHeader} </span>
                </div>
            </div>
            }
            <Link to='/'>
                <div
                    className='tab'
                    style={{ display: width > 800 || isVisibleDisplay ? 'flex' : 'none' }}
                    onClick={() => handleTabClick(() => setActive('mostPopulars'), 'Most Popular', 'star')}
                >
                    <div className='tab-icon' style={{ width: 25, height: 25, color: '#33b7c9' }}>
                        <IconComponent icon='star' />
                    </div>
                    <span className='tabs-name'>{t('Most Popular')} </span>
                </div>
                <div className={`${activeTab === 'mostPopulars' ? ' active' : ''}`}> </div>
            </Link>
            <Link to={`/${location}/${lng}/tours-today`} >
                <div
                    className='tab'
                    style={{ display: width > 800 || isVisibleDisplay ? 'flex' : 'none' }}
                    onClick={() => handleTabClick(() => setActive('toursToday'), 'Tours Today', 'timetable')}
                >
                    <div className='tab-icon' style={{ width: 25, height: 25, color: '#33b7c9' }}>
                        <IconComponent icon='timetable' />
                    </div>
                    <span className='tabs-name' >{t('Tours Today')}</span>
                </div>
                <div className={`${activeTab === 'toursToday' ? ' active' : ''}`}> </div>
            </Link>
            <Link to={`/${location}/${lng}/categories`} >
                <div
                    className='tab'
                    style={{ display: width > 800 || isVisibleDisplay ? 'flex' : 'none' }}
                    onClick={() => handleTabClick(() => setActive('category'), 'Tours by Category', 'list')}
                >
                    <div className='tab-icon' style={{ width: 25, height: 25, color: '#33b7c9' }}>
                        <IconComponent icon='list' />
                    </div>
                    <span className='tabs-name'>{t('Tours by Category')}</span>
                </div>
                <div className={`${activeTab === 'category' ? ' active' : ''}`}></div>
            </Link>
            <Link to={`/${location}/${lng}/vip-tours`}>
                <div className='tab vip-tours'
                    style={{ display: width > 800 || isVisibleDisplay ? 'flex' : 'none' }}
                    onClick={() => handleTabClick(() => setActive('vipTours'), 'Vip Tours')}
                >
                    <span className='tabs-name'> {t('VIP Tours')}</span>
                </div>
            </Link>
            <div className='list-container' onClick={() => toogleList()}>
                <a className='menu-icon' >
                    <div className='list-icon' style={{ width: 25, height: 25, color: '#000' }}>
                        <IconComponent icon='menu' />
                    </div>
                </a>
            </div>
        </div>
    </div >
    );
};

export default Tabs;
