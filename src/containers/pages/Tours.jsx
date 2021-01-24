import React, { useState, useEffect, useRef } from 'react';
import { Menu, Dropdown, Carousel, } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { Loader } from '../../components/simpleUIComponents/Loader';
import ImageSliderPopup from '../../components/popup/ImageSliderPopup';
import Excursion from '../../components/components/Excursion';
import { getToursByCategory, resetTours } from '../../store/tours/tours.actions';


const Tours = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { lng, location } = useSelector(s => s.globals);
    const { tours } = useSelector(s => s.tours);
    const { id } = useParams();
    const [hasFilter, setFilter] = useState(false);
    const [visible, setVisible] = useState(false);
    const [tourImages, setTourImages] = useState([]);
    useEffect(() => {
        if(!tours) {
            getToursByCategory(dispatch, location, id,);
            return () => resetTours(dispatch);
        }
    }, []);

    if (tours && !hasFilter) {
        tours.sort((a, b) => a.pricetForAdults - b.pricetForAdults);
    } else if (hasFilter) {
        tours.sort((a, b) => b.pricetForAdults - a.pricetForAdults);
    }

    const handleMenuClick = () => {
        setFilter(!hasFilter);
    };
    const menu = (
        <Menu>
            <Menu.Item key='menuKey'>
                <p onClick={() => handleMenuClick()}>{hasFilter ? 'Price low to high' : 'Price high to low'}</p>
            </Menu.Item>
        </Menu>
    );
    const handleOpenTourPage = (id) => {
        history.push(`/${location}/${lng}/tour-booking?id=tour_${id}`);
    };
    const openImageModal = (images) => {
        setVisible(true);
        setTourImages(images);
    };
    return (
        <div className='tours-container'>
            <div className='tours-container-dropdown'>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        <span className='tours-container-sort'> {t('Sort by:')} </span>
                        <span className='tours-container-sort text'>{t(hasFilter ? 'Price high to low' : 'Price low to high')}</span>
                        <DownOutlined />
                    </a>
                </Dropdown>
            </div>
            <div className='tours-container-content' >
                {tours && tours.length > 0 ? tours.map(tour => {
                    return <div key={tour.id} className='tour-container' >
                        <Excursion
                            tour={tour}
                            fromCart={false}
                            openTourPage={() => handleOpenTourPage(tour.id)}
                            lng={lng}
                            openImageModal={openImageModal}
                        />
                        <ImageSliderPopup
                            visible={visible}
                            toggleVisibility={() => setVisible(false)}
                            imagesPathArr={tourImages}
                        />
                    </div>
                }) : <Loader />}
            </div>
            


        </div>
    )
};

export default Tours;
