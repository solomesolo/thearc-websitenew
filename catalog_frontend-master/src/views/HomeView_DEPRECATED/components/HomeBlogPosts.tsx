import React from 'react';
import client from "../../../api/client";
import {BlogPost} from "../../../api/types";

type BlogItemPostProps = {
    post: BlogPost
}
const BlogItemPost = (props: BlogItemPostProps) => {
    return (
        <div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev"
             data-swiper-slide-index="2"
             style={{width: 319, marginRight: 20}}
             role="group"
             aria-label="2 / 13">
            <div className="card-grid-style-1">
                <div className="image-box">
                    <img src={props.post.image_url} alt="Ecom"/>
                </div>
                {/*<a className="tag-dot font-xs" href="blog-list.html">Gaming</a>*/}
                <a className="color-gray-1100" href={`/blog/${props.post.id}`}>
                <h4>{props.post.title}</h4></a>
                <div className="mt-20"><span className="color-gray-500 font-xs mr-30">August 25, 2022</span><span
                    className="color-gray-500 font-xs">3<span> Mins read</span></span></div>
            </div>
        </div>

    )

}

type Props = {}
const HomeBlogPosts = (props: Props) => {
    const [{data, loading, error}, refetch] = client.blog.posts();

    if (loading || !data) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading...</div>
    }

    return (
        <>
            <section className="section-box mt-50">
                <div className="container">
                    <div className="head-main">
                        <h3 className="mb-5">Latest Posts &amp; News</h3>
                        <p className="font-base color-gray-500">From our blog</p>
                        <div className="box-button-slider">
                        </div>
                    </div>
                </div>
                <div className="container mt-10">
                    <div className="box-swiper">
                        <div
                            className="swiper-container swiper-group-4 swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                            <div className="swiper-wrapper pt-5" id="swiper-wrapper-3bdf32f1ccdcb1096" aria-live="off">
                                {data.results.map((post, index) => (
                                    <BlogItemPost key={index} post={post}/>
                                    ))}
                            </div>
                            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeBlogPosts;