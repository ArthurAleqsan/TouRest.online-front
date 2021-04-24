import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { WithTitle } from '../withTitle/WithTitle';
import Tabs from '../Tabs';
import Slider from '../Slider';
import ToursPage from '../../../containers/pages/ToursPage';
import Taxi from '../../../containers/pages/Taxi';
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
                <Route path='/:location/:lng/categories' component={() => (<WithTitle title='Choose tour category'><CategoryContainer /></WithTitle>)} />
                <Route path='/:location/:lng/tours/:id' component={() => (<WithTitle title='Choose best tours'><Tours /></WithTitle>)} />
                <Route path='/:location/:lng/tours-today' component={() => (<WithTitle title='Todays avaiable tours'><ToursPage headerName={'Tours Today'} fromToursToday={true} /></WithTitle>)} />
                <Route path='/:location/:lng/vip-tours' component={() => (<WithTitle title='VIP Tours'><ToursPage headerName='VIP Tours' fromToursToday={false} /></WithTitle>)} />
                <Route path='/:location/:lng/tour-booking' component={() => (<WithTitle title='Book Tour'><TourBookingPage /></WithTitle>)} />
                <Route path='/:location/:lng/taxi' component={() => (<WithTitle title={'Online taxi'}><Taxi /></WithTitle>)} />
                <Route path='/:location/:lng' component={() => (<WithTitle><ToursPage headerName='Most Popular' fromToursToday={false} /></WithTitle>)} />
            </Switch>
        </div>
    )
};
export default WithSlider;