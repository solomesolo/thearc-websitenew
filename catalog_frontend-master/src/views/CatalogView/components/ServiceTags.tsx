import React, { useCallback, useEffect, useState } from 'react';
import CatalogItem from "./CatalogItem/CatalogItem";
import useAxios from 'axios-hooks'
import { Category, Paginated, Service, ServiceTag } from "../../../api/types";
import client, { getClient } from "../../../api/client";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import "../styles/serviceTags.scss"
import { CategoryBlock } from './CategoryBlock';
import { TagsBlock } from './TagsBlock';
import { CharacteristicsBlock } from './CharacteristicsBlock';
import { PriceRange } from './PriceRange';

type Props = {
    category: string | null,
    selectedTagIds: number[],
    onTagChange: (tagIds: number[]) => void,
    onCategoryChange: (categoryId: string | null) => void,
    selectedCategory: string | null,
}
const ServiceTags = (props: Props) => {
    const [{ data, loading, error }] = client.catalog.categories();

    const [tags, setTags] = useState<Paginated<ServiceTag>>();

    // const [tags] = getClient().catalog.tags({category: props.category});

    const loadTags = (category: string | null) => {
        setTags(undefined);
        // let filters: any = {tags: props.selectedTagIds, page: page};
        // if (props.categoryId) {
        //     filters['categories'] = props.categoryId;
        // }
        getClient().catalog.tags({ category: props.category }).then(setTags);
    }


    useEffect(() => {
        loadTags(props.category);
    }, [props.category]);

    return (
        <div className='service-tags'>
            <CategoryBlock data={data} loading={loading} error={error} onCategoryChange={props.onCategoryChange} selectedCategory={props.selectedCategory} />
            {/* <CharacteristicsBlock />
            <PriceRange /> */}
            <TagsBlock selectedTagIds={props.selectedTagIds} tags={tags} onTagChange={props.onTagChange} />
        </div>
    );
};

export default ServiceTags;