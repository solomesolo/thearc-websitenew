import React from 'react';
import RatingComponent from "../../../components/RatingComponent";
import {Link} from "react-router-dom";
import {Service} from "../../../api/types";

type Props = {
    service: Service
}
const HomeServiceItem = (props: Props) => {
    return (
        <>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <Link to={`/catalog/${props.service.id}`}>
                    <div className="card-vendor">
                        <div className="card-top-vendor">
                            <div className="card-top-vendor-left">
                                <img src={props.service.logo} alt="Ecom"/>
                                <br/>
                                <a className="color-brand-3 font-sm-bold" href="shop-single-product.html">
                                    {String(props.service.name || 'Unknown Service')}
                                </a>
                                <br/>
                                <span className="font-xs color-gray-500 mb-10">
                                {String(props.service.link || 'No link available')}
                            </span>
                            </div>
                            <div className="card-top-vendor-right">
                                {props.service.ratings && props.service.ratings.length > 0 &&
                                    <RatingComponent rating={props.service.ratings[0]}/>}
                                <p className="font-xs color-gray-500 mt-10">
                                    {props.service.categories && props.service.categories.map(c => (
                                        <span key={c.id}>{String(c.name || 'Unknown Category')}</span>))}</p>
                            </div>
                        </div>
                        <div className="card-bottom-vendor">
                            <p className="font-sm color-gray-500 mb-10">
                                {String(props.service.description || '').slice(0, 200) + "..."}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

        </>
    );
};

export default HomeServiceItem;