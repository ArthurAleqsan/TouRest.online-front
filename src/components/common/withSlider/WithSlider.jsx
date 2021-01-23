import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { WithTitle } from '../withTitle/WithTitle';
import Tabs from '../Tabs';
import Slider from '../Slider';
import ToursPage from '../../../containers/router/pages/ToursPage';
// import CategoriesContainer from './categoriesPage/CategoryContainer';
// import Tabs from '../common/Tabs/Tabs';
// import ToursPage from './tours-page/ToursPage';
// import TourBookingPage from './tourBooking/TourBookingPage';
// import Tours from './tours/Tours';
// import Taxi from './taxi/Taxi';

const WithSlider = ({ singleTourName }) => {
    const isTaxiPage = window.location.pathname.includes('taxi');
    return (
        <div>
            <Slider />
            {!isTaxiPage && <Tabs />}
            <Switch>
                {/* <Route path='/:location/:lng/categories' component={() => (<WithTitle title='Choose tour category'><CategoriesContainer /></WithTitle>)} />
                <Route path='/:location/:lng/tours' component={() => (<WithTitle title='Choose best tours'><Tours /></WithTitle>)} />
                <Route path='/:location/:lng/tours-today' component={() => (<WithTitle title='Todays avaiable tours'><ToursPage headerName={'Tours Today'} fromToursToday={true} /></WithTitle>)} />
                <Route path='/:location/:lng/vip-tours' component={() => (<WithTitle title='VIP Tours'><ToursPage headerName='VIP Tours' fromToursToday={false} /></WithTitle>)} />
                <Route path='/:location/:lng/tour-booking' component={() => (<WithTitle title={singleTourName}><TourBookingPage /></WithTitle>)} />
                <Route path='/:location/:lng/taxi' component={() => (<WithTitle title={'Online taxi'}><Taxi /></WithTitle>)} /> */}
                <Route path='/:location/:lng' component={() => (<WithTitle><ToursPage headerName='Most Popular' fromToursToday={false} /></WithTitle>)} />
            </Switch>
        </div>
    )
};
WithSlider.propTypes = {
    singleTourName: PropTypes.string,
};
export default WithSlider;