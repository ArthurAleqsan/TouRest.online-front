import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Tabs from '../Tabs';
import Slider from '../Slider';
import ToursPage from '../../../containers/pages/ToursPage';
import CategoryContainer from '../../../containers/pages/category/CategoryContainer';
import Tours from '../../../containers/pages/Tours';
import TourBookingPage from '../../../containers/pages/TourBookingPage';

const WithSlider = () => {
    const isTaxiPage = window.location.pathname.includes('taxi');
    return (
        <div>
            <Slider />
            {!isTaxiPage && <Tabs />}
            <Switch>
                <Route path='/:location/:lng/categories' component={() => (<CategoryContainer />)} />
                <Route path='/:location/:lng/tours/:id' component={() => (<Tours />)} />
                <Route path='/:location/:lng/tours-today' component={() => (<ToursPage headerName={'Tours Today'} fromToursToday={true} />)} />
                <Route path='/:location/:lng/vip-tours' component={() => (<ToursPage headerName='VIP Tours' fromToursToday={false} />)} />
                <Route path='/:location/:lng/tour-booking' component={() => (<TourBookingPage />)} />
                <Route path='/:location/:lng' component={() => (<ToursPage headerName='Most Popular' fromToursToday={false} />)} />
            </Switch>
        </div>
    )
};
export default WithSlider;