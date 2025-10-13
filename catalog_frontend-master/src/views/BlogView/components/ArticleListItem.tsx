import React from 'react';
import {Link} from "react-router-dom";
import {BlogPost} from "../../../api/types";
import "./article.css"

type Props = {
    post: BlogPost,
    featured?: boolean
}
const ArticleListItem = (props: Props) => {
    return (
        <div className={`col-lg-3 col-md-4 col-sm-6 mb-40 article${props.featured ? ' featured' : ''}`}>
            <div className="card-grid-style-1">
                <Link to={`/blog/${props.post.id}`} className="image-box article-img">
                    <img src={props.post.image_url} alt="Ecom"/>
                </Link>
                <div className="blog-article-tags">
                  {props.post.tags && props.post.tags.map((tag: string) => (
                    <span className="blog-article-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <Link to={"/blog/" + props.post.id} className="color-gray-1100">
                    <h4>{props.post.title}</h4>
                </Link>
                {!props.featured && (
                  <div className="excerpt">{props.post.excerpt}</div>
                )}
                <div className="mt-20">
                    <span className="color-gray-500 font-xs">4<span>Mins read</span></span>
                </div>
            </div>
        </div>
    );
};

export default ArticleListItem;