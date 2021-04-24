import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCategories } from '../../../store/categories/categories.actions';
import { Loader } from '../../../components/simpleUIComponents/Loader';
import { Category } from '../../../components/components/Category';


const CategoriesPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { location, lng } = useSelector(s => s.globals);
    const { categories } = useSelector(s => s.categories);
    useEffect(() => {
        if (location && categories.length === 0) {
            getCategories(dispatch, location);
        }
    }, [])

    return (
        <div className='tours-page-container categories-container'>
            <div className='tours-page-container-header'>
                {t('Tours by category')}
            </div>
            <div className='tours-page-container-content'>
                {categories && categories.length > 0 ? categories.map((category, i) => (
                    <div className='categories-content' key={category.id}>
                        <Category
                            category={category}
                            index={i}
                            location={location}
                            lng={lng}
                        />
                    </div>
                )) : <Loader />}
            </div>
        </div>
    )
};

export default CategoriesPage;
