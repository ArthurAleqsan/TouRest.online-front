import { message } from 'antd';
import BlogService from '../../services/BlogService';
import * as types from './../types';

export const setLng = (dispatch, lng) => {
    sessionStorage.setItem('lng', JSON.stringify(lng));
    dispatch({
        type: types.SET_LNG,
        lng,
    });
};

export const resetImagesArr = (dispatch) => {
    dispatch({
        type: types.RESET_IMAGES,
    })
};
export const setLocation = (dispatch, location) => {
    dispatch({
        type: types.SET_LOCATION,
        location,
    })
};
export const getCountryCode = (dispatch) => {
    fetch('https://extreme-ip-lookup.com/json/')
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: types.SET_COUNTRY,
                country: response.country,
            })
        })
};
export const setSliderImages = (imagesArr) => {
    return {
        type: types.SET_SLIDER_IMAGES,
        imagesArr,
    };
};

export const getBlogPosts = (dispatch) => {
    BlogService.getBlogs()
        .then(res => {
            const { status, json: blogPosts } = res;
            console.log(blogPosts)
            if (BlogService.isOkStatus(status)) {
                dispatch({
                    type: types.SET_BLOG_POSTS,
                    blogPosts,
                });
            } else {
                message.error(blogPosts.message);
            }

        })
};
export const getSingleBlogPost = (dispatch, id) => {
    dispatch(setSliderImages([]));
    BlogService.getSingleBlog(id)
        .then(res => {
            const { status, json: singleBlogPost } = res;
            console.log(res)
            if (BlogService.isOkStatus(status)) {
                dispatch(setSliderImages(singleBlogPost.urls));
                dispatch({
                    type: types.SET_SINGLE_BLOG_POSTS,
                    singleBlogPost
                });
            } else {
                message.error(singleBlogPost.message);
            }
        })
}