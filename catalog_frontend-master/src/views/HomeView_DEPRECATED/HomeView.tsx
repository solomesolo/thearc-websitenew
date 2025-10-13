import React, {useEffect, useState} from 'react';
import NewCompaniesList from "./components/NewCompaniesList";
import {Link} from "react-router-dom";
import ArticleListItem from "../BlogView/components/ArticleListItem";
import client, {getClient} from "../../api/client";
import {Paginated, Service} from "../../api/types";
import HomeBlogPosts from "./components/HomeBlogPosts";
import HomeBannerHero from "./components/HomeBannerHero";
import SubscribePanel from "./components/SubscribePanel";
import Loader from "../../components/Loader";

type Props = {}
const HomeView = (props: Props) => {
    const [services, setServices] = useState<Paginated<Service>>();

    const [{data, loading, error}, refetch] = client.blog.posts();

    useEffect(() => {
        loadServices(1);
    }, []);
    const loadServices = (page: number) => {
        setServices(undefined);
        getClient().catalog.services({page: page}).then(setServices);
    }

    // return <Loader/>

    if (loading || !data || !services) {
        return <Loader/>
    }
    if (error) {
        return <Loader/>
    }

    // console.log('services = ', services);

    return (
        <>
            <HomeBannerHero/>
            <section className="section-box mt-30">
                <div className="container">
                    <div className="border-bottom pb-25 head-main">
                        <h3>Medical Services</h3>
                        <p className="font-base color-gray-500">Some of the best medical services from all over the
                            world</p>
                    </div>
                    <NewCompaniesList/>
                </div>
            </section>
            <SubscribePanel/>
            <section className="section-box mt-30">
                <div className="container">
                    <div className="row">
                    </div>
                    <HomeBlogPosts/>
                </div>
            </section>
        </>
    );
};

export default HomeView;