import { shuffle } from '../../util/helpers';
import { sliderImages } from './../../util/config';
import * as types from './../types';

const initialState = {
    location: sessionStorage.city ? JSON.parse(sessionStorage.city) : '',
    lng: sessionStorage.lng ? JSON.parse(sessionStorage.lng) : 'Eng',
    imagesArr: shuffle(sliderImages),
    cities: ['Sharm El Sheikh', 'Hurghada',],
    languages: ['eng', 'rus'],
    blogPosts: null,
    singleBlogPost: null,
    country: null,
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOCATION:
            return {
                ...state,
                location: action.location,
            };
        case types.SET_COUNTRY:
            return {
                ...state,
                country: action.country
            }
        case types.SET_LNG:
            return {
                ...state,
                lng: action.lng,
            }
        case types.SET_SLIDER_IMAGES:
            return {
                ...state,
                imagesArr: action.imagesArr,
            }
        case types.RESET_IMAGES:
            return {
                ...state,
                imagesArr: sliderImages,
            }
        case types.SET_BLOG_POSTS:
            return {
                ...state,
                blogPosts: action.blogPosts,
            }
        case types.SET_SINGLE_BLOG_POSTS:
            return {
                ...state,
                singleBlogPost: action.singleBlogPost,
            }
        default:
            return state
    }
};

export default globalReducer;