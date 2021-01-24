import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIdFromPath } from '../../util/helpers';
import { addToCart, getTourById, setTourData } from '../../store/tours/tours.actions';
import { Loader } from '../../components/simpleUIComponents/Loader';
import TourBookingComponent from '../../components/components/TourBookingComponent';

const TourBookingPage = () => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { singleTour } = useSelector(s => s.tours);

    useEffect(() => {
        if (!singleTour) {
            // resetImages();
            console.log(search);
            const id = getIdFromPath(search, 'id=tour_');
            console.log(id);
            getTourById(dispatch, id);
        }
    }, []);
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
