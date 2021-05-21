import React, { useState, lazy, Suspense, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { resetCategories } from '../../store/categories/categories.actions';
import { setLocation, getCountryCode } from '../../store/global/global.actions';
import { setOrderData } from '../../store/order/order.actions';

import Header from '../../components/common/Header';
import SocialIcons from '../../components/common/SocialIcons';
import { CityPopup } from '../../components/popup/CityPopup';
import WithSlider from '../../components/common/withSlider/WithSlider';
import About from '../pages/About';
import Privacy from '../pages/Privacy';
import CartPage from '../pages/CartPage';
import { Loader } from '../../components/simpleUIComponents/Loader';
import Blog from '../pages/Blog';
import SingleBlog from '../pages/SingleBlog';
import { getLngKey, makePath } from '../../util/helpers';
import Footer from '../../components/common/Footer';
import CategoryContainer from '../pages/category/CategoryContainer';


const MainRouter = () => {

    const [visible, setVisible] = useState(false);
    const { location, lng, cities } = useSelector(s => s.globals, shallowEqual);
    const dispatch = useDispatch();

    const handleLoad = () => {
        setVisible(true);
    };
    const handleWindowOnLoad = () => {
        getCountryCode(dispatch);
        if (window.location.pathname !== '/') {
            const city = window.location.pathname.split('/')[1];
            if (city == 'hurghada' || city == 'Hurghada') {
                sessionStorage.setItem('city', JSON.stringify('Hurghada'));
            } else if (city == 'Aswan' || city == 'aswan') {
                sessionStorage.setItem('city', JSON.stringify('Aswan'));
            } else {
                sessionStorage.setItem('city', JSON.stringify('Sharm El Sheikh'));
            }
        }
        if (sessionStorage.getItem('city')) {
            setLocation(dispatch, JSON.parse(sessionStorage.getItem('city')));
        } else {
            handleLoad();
        }
    };
    useEffect(() => {
        handleWindowOnLoad();
    }, []);
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
                    <Route path={`/:location/:lng/cart`} component={() => <CartPage />} />
                    <Route path={`/:location/:lng/blog/:id`} component={() => <SingleBlog />} />
                    <Route path={`/:location/:lng/blog`} component={() => <Blog />} />
                    <Route path={`/:location/:lng/privacy`} component={() => <Privacy />} />
                    <Route path={`/:location/:lng/about`} component={() => <Suspense fallback={<Loader />}><About /></Suspense>} />
                    <Route path={`/:location/:lng/categories`}
                        component={() => <Suspense fallback={<Loader />}>
                            <WithSlider>
                                <CategoryContainer />
                            </WithSlider>
                        </Suspense>}
                    />
                    {/* <Route path={`/:location/:lng/vip-tours`}
                        component={() => <Suspense fallback={<Loader />}>
                            <WithSlider>
                                <CategoryContainer vip/>
                            </WithSlider>
                        </Suspense>} /> */}
                    <Route path={`/:location/:lng`} component={() => <WithSlider />} />
                    {location ? <Redirect to={`/${makePath(location)}/${lng}`} /> : <Redirect to={`/${makePath(location)}`} />}
                </Switch>
            </section>
            <Footer />
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
