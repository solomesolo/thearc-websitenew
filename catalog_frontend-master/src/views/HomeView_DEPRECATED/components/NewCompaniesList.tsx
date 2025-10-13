import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Paginated, Service} from "../../../api/types";
import {getClient} from "../../../api/client";
import RatingComponent from "../../../components/RatingComponent";
import ServiceCard from "../../../components/ServiceCard";

type Props = {}


const NewCompaniesList = (props: Props) => {
    const [services, setServices] = useState<Paginated<Service>>();

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = () => {
        setServices(undefined);
        getClient().catalog.services({page_size: 8}).then(setServices);
    }

    return (
        <>

            <div className="row">
                {services?.results.map((service) => (
                    <ServiceCard key={service.id} service={service}/>
                ))}

            </div>

        </>
    );
};

export default NewCompaniesList;