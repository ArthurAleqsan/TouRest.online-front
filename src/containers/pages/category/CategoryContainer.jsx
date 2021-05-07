import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CategoriesPage from './CategoriesPage';
import Tours from '../Tours';


const CategoryContainer = () => {

    return <div>
        <Switch>
            <Route path='/:location/:lng/categories/:id' component={Tours} />
            <Route path='/:location/:lng/categories' component={CategoriesPage} />
        </Switch>
    </div>
}

export default CategoryContainer;