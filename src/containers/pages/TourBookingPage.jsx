import React, { useEffect, Fragment } from 'react';
import { shallowEqual, useDispatch, useSelector, useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIdFromPath } from '../../util/helpers';
import { addToCart, getTourById, setTourData } from '../../store/tours/tours.actions';
import { Loader } from '../../components/simpleUIComponents/Loader';
import TourBookingComponent from '../../components/components/TourBookingComponent';

const TourBookingPage = () => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { singleTour } = useSelector(s => s.tours, shallowEqual);

    // useEffect(() => {
    //     // resetImages();


    // }, []);
    if(!singleTour) {
        const id = getIdFromPath(search, 'id=tour_');
        getTourById(dispatch, id);
    }
    // console.log(singleTour);
    return (
        <div className='tourBookingPage-container'>
            {singleTour ? (
                <Fragment>
                    <TourBookingComponent
                        singleTour={singleTour}
                    />
                </Fragment>)
                :
                (<div>
                    <Loader />
                </div>)}
        </div>
    )
};

export default TourBookingPage;
