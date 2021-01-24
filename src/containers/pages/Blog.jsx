import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import { Carousel } from 'antd';
import { getLngKey } from '../../util/helpers';
import { Loader } from '../../components/simpleUIComponents/Loader';
import { getBlogPosts, setSliderImages } from '../../store/global/global.actions';
import ImageSliderPopup from '../../components/popup/ImageSliderPopup';


export const replaceSimbolToBR = (str, separator) => str.split(separator).map((item, i) => <div key={i}><span>{item}</span></div>);

const Blog = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { blogPosts, lng } = useSelector(s => s.globals);
    useEffect(() => {
        if(!blogPosts) {
            getBlogPosts(dispatch);
        }
    }, []);

    const carousel = useRef(null);
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [tourImages, setTourImages] = useState([]);
    const handleChange = () => {
        setIndex(index + 1);
    };
    const openImageModal = (images) => {
        setTourImages(images);
        setVisible(true);
    };
    const handleRedirect = (post) => {
        dispatch(setSliderImages(post.urls));
        history.push(`${location.pathname}/${post.id}`);
    };
    return (
        <div className='blog-page'>
            <div className='blog-page-header-container'>
                <div className='blog-header'><span>{t('TouRest.online Blog')}</span></div>
                <div className='blog-header-desc'>{t('Something interested')}</div>
            </div>
            <div className='blog-body'>
                {blogPosts ? blogPosts.map((post, i) => {

                    return <div className={`blog-post-container ${i % 2 == 0 ? '' : 'reverse-content'}`} key={post.id} style={{ flexDirection: i % 2 == 0 ? 'row' : 'row-reverse' }}>
                        <Carousel
                            afterChange={handleChange}
                            className={`carousel-container`}
                            ref={carousel}
                            dotPosition={'top'}
                            autoplay
                        >
                            {post?.urls?.map(img => {
                                return <div key={i} className='carusel-item-container' onClick={() => openImageModal(post.urls)}>
                                    <img className='image' src={img} alt={img} />
                                </div>
                            })}
                        </Carousel>
                        <ImageSliderPopup visible={visible} toggleVisibility={() => setVisible(false)} imagesPathArr={tourImages} />
                        <div className={`blog-post-desc-content ${i % 2 == 0 ? '' : 'reverse-content'}`} onClick={() => handleRedirect(post)}>
                            <div className='blog-post-text-content'>
                                <div className='blog-post-name'><span>{post[`${getLngKey(lng)}_name`]}</span></div>
                                <div className='blog-post-desc'>
                                    {replaceSimbolToBR(post[`${getLngKey(lng)}_description`], '##')}
                                </div>
                            </div>
                        </div>
                    </div>
                }) : <Loader />}
            </div>
        </div>
    )
};

export default Blog;
