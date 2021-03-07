import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTours } from '../../store/tours/tours.actions';

const MostPopular = ({ city }) => {
    const dispatch = useDispatch();
    const { tours } = useSelector(s => s.tours, shallowEqual);
    useEffect(() => {
        if(!tours) {
            getTours(dispatch, city)
        }
        return () => {
            console.log('object');
        }
    }, []);
    return (
        <div>

        </div>
    )
};

export default MostPopular;
