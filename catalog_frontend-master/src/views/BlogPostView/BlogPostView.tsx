import React from 'react';
import {Link, useParams} from "react-router-dom";
import client from "../../api/client";
import RecentPosts from "./components/RecentPosts";
import "../BlogView/blog.css"

type Props = {}
const BlogPostView = (props: Props) => {
    let {postId} = useParams();
    if (!postId) {
        return <div>Post not found</div>
    }

    const [{data, loading, error}, refetch] = client.blog.post(postId);
    if (loading || !data) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading...</div>
    }


    return (
        <>
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link to={"/blog/"} className="font-xs color-gray-1000">Blog</Link></li>
                            <li><span className="font-xs color-gray-1000">{data.title}</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="section-box shop-template mt-30">
                <div className="container">

                    <div className="col-lg-12 mb-50 display-list">
                        <h3 className="mt-15 mb-25">{data.title}</h3>
                        <div className="box-author mb-5">
                            {/*<span className="datepost color-gray-500 font-sm mr-30">August 30, 2022</span>*/}
                            <span className="timeread color-gray-500 font-sm">4 Mins read</span>
                        </div>
                        <div className="image-feature"><img src="/assets/imgs/page/blog/img-big.png" alt="Ecom"/></div>
                        <div className="content-text blog-article">
                            <p className="mb-8" dangerouslySetInnerHTML={{__html: data.text || ""}}>
                            </p>

                        </div>
                    </div>

                    <RecentPosts/>
                </div>
            </section>
        </>
    );
};

export default BlogPostView;