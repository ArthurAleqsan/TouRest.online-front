import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSliderImages } from '../../store/global/global.actions';



const taxiImages = ['/assets/images/slider/1.jpg', '/assets/images/slider/2.jpg',];
const Taxi = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSliderImages(taxiImages));
    }, []);
    return (
        <div className = 'aaaaa'>
            <div>adfsafsdfsdf</div>
        </div>
    )
};

export default Taxi;