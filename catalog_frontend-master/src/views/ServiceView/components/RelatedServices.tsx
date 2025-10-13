import React, { useEffect, useState } from 'react';
import { Paginated, Service } from "../../../api/types";
import ServiceCard from "../../../components/ServiceCard";
import { getClient } from "../../../api/client";
import "../styles/relatedServices.scss"

type Props = {
    service: Service
}

const RelatedServices = (props: Props) => {
    const [services, setServices] = useState<Paginated<Service>>();

    useEffect(() => {
        // Only fetch related services if the service has categories
        if (props.service.categories && props.service.categories.length > 0) {
            getClient().catalog.services({ 'categories': props.service.categories[0].id }).then(setServices);
        }
    }, [props.service.categories]);

    return (
        <div className='services-main'>
            <h3 className="color-brand-3 mb-20">Related Services</h3>
            <div className="services">
                {services?.results
                    .filter((v) => v.id != props.service.id)
                    .slice(0, 4).map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
            </div>
        </div>
    );
};

export default RelatedServices;