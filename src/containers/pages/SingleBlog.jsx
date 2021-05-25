import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { replaceSimbolToBR } from './Blog';
import { getIdFromPath, getLngKey } from '../../util/helpers';
import { getSingleBlogPost } from '../../store/global/global.actions';
import { Loader } from '../../components/simpleUIComponents/Loader';
import SliderContentDesc from '../../components/common/SliderContentesc';
import Slider from '../../components/common/Slider';

const SingleBlog = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const id = getIdFromPath(location.pathname, '/blog/').split('&')[0];
    const { singleBlogPost, lng } = useSelector(s => s.globals);

    useEffect(() => {
        if(!singleBlogPost) {
            getSingleBlogPost(dispatch, id);
        }
    }, []);
    return (
        <div className='single-blog-page'>
            {singleBlogPost ? <div className='single-blog-body'>
                <Slider imagesArr={singleBlogPost.urls} />
                <SliderContentDesc
                    header={singleBlogPost[`${getLngKey(lng)}_title`]}
                    text={replaceSimbolToBR(singleBlogPost[`${getLngKey(lng)}_description`], '##')}
                />
            </div> : <Loader />}
        </div>
    )
};

export default memo(SingleBlog);