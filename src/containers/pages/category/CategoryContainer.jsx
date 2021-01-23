import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CategoriesPage from './CategoriesPage';
import { useTranslation } from 'react-i18next';
// import Tours from '../tours/Tours';

const CategoryContainer = () => {
    const { t } = useTranslation();
    return <div>
        <Switch>
            {/* <Route path='/:location/:lng/categories/:id' component={Tours} /> */}
            <Route path='/:location/:lng/categories' component={CategoriesPage} />
        </Switch>
    </div>
}

export default CategoryContainer;