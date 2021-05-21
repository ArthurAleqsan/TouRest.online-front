import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Loader } from '../../components/simpleUIComponents/Loader';
import { _404_Page } from './_404_Page';
import { SimpleExcursion } from '../../components/components/SimpleExcursion';
import {getTours, resetTours, resetSingleTour, getTourById} from '../../store/tours/tours.actions';
import {getVipTours} from "../../store/tours/tours.actions";
import  {getLngKey} from "../../util/helpers";
import {makePath} from "../../util/helpers";

const ToursPage = ({ headerName, fromToursToday }) => {
    const [loader, setDisableLoader] = useState(true);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { tours, singleTour } = useSelector(s => s.tours, shallowEqual);
    const { location: city, lng } = useSelector(s => s.globals);

    useEffect(() => {
        switch (headerName) {
            case 'Most Popular':
                getTours(dispatch, city)
                break;
            case 'Tours Today':
                // getMostPopularTours(city);
                setTimeout(() => {
                    setDisableLoader(false);
                }, 2000);

                break;
            case 'VIP Tours':
                getVipTours(dispatch, city)
                 setTimeout(() => {
                    setDisableLoader(false);
                 }, 2000);
                break;

        }
        return () => {
            resetTours(dispatch);
            resetSingleTour(dispatch);
        };
    }, []);
    const handleRedirectClick = (id,tourName) => {
        if (singleTour && singleTour.id !== id) {
            resetSingleTour(dispatch);
            getTourById(dispatch, id);

        }
        tourName = makePath(tourName);
        if (!singleTour) getTourById(dispatch, id);
        history.push(`/${city}/${lng}/tour-booking?name=${tourName}&id=tour_${id}`);
    }
    return (
        <div className='tours-page-container'>
            <p className='tours-page-container-header'>{t(headerName)}</p>
            <div className='tours-page-container-content'>
                {headerName === 'Tours Today'
                    ? loader ? <Loader /> : <_404_Page headerName='Now we do not have a available tours for today' fromToursToday={true} />
                    : tours && tours.length > 0 ? tours.map(tour => (
                        <div className='tours-page-container-tour' key={tour.id} onClick={() => handleRedirectClick(tour.id, tour[`${getLngKey(lng)}_name`])}>
                            <SimpleExcursion
                                tour={tour}
                                lng={lng}
                                fromToursToday={fromToursToday}
                            />
                        </div>
                    )
                    ) : <Loader />}
            </div>
        </div>
    )
};
ToursPage.propTypes = {
    headerName: PropTypes.string,
    fromToursToday: PropTypes.bool,
};

export default ToursPage;