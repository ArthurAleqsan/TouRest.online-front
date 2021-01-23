import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { resetCategories } from '../../store/categories/categories.actions';
import { setLocation, getCountryCode } from '../../store/global/global.actions';
import { setOrderData } from '../../store/order/order.actions';

import Header from '../../components/common/Header';
import SocialIcons from '../../components/common/SocialIcons';
import { CityPopup } from '../../components/popup/CityPopup';
import { WithTitle } from '../../components/common/withTitle/WithTitle';
import WithSlider from '../../components/common/withSlider/WithSlider';


const MainRouter = () => {

    const [visible, setVisible] = useState(false);
    const { location, lng, languages, cities } = useSelector(s => s.globals);
    const { singleTour } = useSelector(s => s.tours);
    const dispatch = useDispatch();

    const handleLoad = () => {
        setVisible(true);
    };
    const handleWindowOnLoad = () => {
        getCountryCode(dispatch);
        if (window.location.pathname !== '/') {
            const city = window.location.pathname.split('/')[1];
            if (cities.indexOf(city) > -1) {
                sessionStorage.setItem('city', JSON.stringify(city));
            } else {
                sessionStorage.setItem('city', JSON.stringify('sharm-el-sheikh'));
            }
        }
        if (sessionStorage.getItem('city')) {
            setLocation(dispatch, JSON.parse(sessionStorage.getItem('city')));
        } else {
            handleLoad();
        }
    };
    window.onload = handleWindowOnLoad;
    console.log('object');

    return (
        <div className="app" style={{
            background: '#f2f2f2'
        }}
        >
            <Header />
            <section className='app-content-container'>
                <SocialIcons
                    color='black'
                    className='static'
                />
                <Switch>
                    {/* <Route path={`/:location/:lng/cart`} component={() => <WithTitle title='Your selected tours'><CartPage /></WithTitle>} />
                    <Route path={`/:location/:lng/blog/:id`} component={() => <SingleBlog />} />
                    <Route path={`/:location/:lng/blog`} component={() => <Blog />} />
                    <Route path={`/:location/:lng/privacy`} component={() => <Privacy />} />
                    <Route path={`/:location/:lng/about`} component={() => <Suspense fallback={<div>555</div>}><About /></Suspense>} /> */}
                    <Route path={`/:location/:lng`} component={() => <WithSlider singleTourName={singleTour && singleTour[`en_name`]} />} />
                    {location ? <Redirect to={`/${location}/${lng}`} /> : <Redirect to={`/${location}`} />}
                </Switch>
            </section>
            <CityPopup
                visible={visible}
                setVisible={setVisible}
                cities={cities}
                setCity={setLocation}
                resetCategories={resetCategories}
                setOrderData={setOrderData}
            />
        </div>
    );
};

export default withRouter(MainRouter);
