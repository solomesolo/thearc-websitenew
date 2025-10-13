import React from 'react';
import client from "../../../api/client";
import {useParams} from "react-router-dom";


type Props = {}
const RecentPosts = (props: Props) => {
    const [{data, loading, error}, refetch] = client.blog.posts();

    if (loading || !data) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading...</div>
    }


    return (
        <>
            <h3 className="color-brand-3">Related Blogs</h3>
            <div className="row mt-30 articles-list">
                {data.results.map((post) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-40">
                        <div className="card-grid-style-1">
                            <div className="image-box">
                                <a href="blog-single.html">
                                    <img src={post.image || post.image_url} alt="Ecom"/>
                                </a>
                            </div>
                            {/*<a className="tag-dot font-xs" href="#">Technology</a>*/}
                            <a className="color-gray-1100" href="blog-single.html">
                                <h4>{post.title}</h4>
                            </a>
                            <div className="row mt-20">
                                <div className="col-12">
                                    {/*<span className="color-gray-500 font-xs mr-30">August 30, 2022</span>*/}
                                    <span className="color-gray-500 font-xs">4<span> Mins read</span></span>
                                </div>
                            </div>
                        </div>
                    </div>))
                }
            </div>
        </>
    );
};

export default RecentPosts;