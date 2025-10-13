import React, { useEffect, useState, useCallback, useMemo } from 'react';
import CatalogList from "./components/CatalogList";
import client from "../../api/client";
import ServiceTags from "./components/ServiceTags";
import Pagination from "../../components/Pagination";
import { useSearchParams } from 'react-router-dom';
import { PageStat } from "../../api/types";
import { FilterButton } from './components/FilterButton';
import { useToggleHeader } from '../../components/hooks/useToggleHeader';
import { useToggleFooter } from '../../components/hooks/useToggleFooter';
import { CrossComponent } from './components/CrossComponent';
import { domainLinks } from '../../constants/domainLinks';

type Props = {}
const CatalogView = React.memo((props: Props) => {
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageStat, setPageStat] = useState<PageStat>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterMenuOpened, setIsFilterMenuOpened] = useState(false)
    const { hide: headerHide, show: headerShow } = useToggleHeader()
    const { hide: footerHide, show: footerShow } = useToggleFooter()

    useEffect(() => {
        if (isFilterMenuOpened) {
            headerHide()
            footerHide()
        } else {
            headerShow()
            footerShow()
        }
    }, [isFilterMenuOpened, headerHide, headerShow, footerHide, footerShow])

    useEffect(() => {
        if (selectedTags.length !== 0) {
            setIsFilterMenuOpened(false)
        }
    }, [selectedTags])

    const isOpenClassName = useMemo(() => isFilterMenuOpened ? "opened" : "", [isFilterMenuOpened]);
    const isVisible = useMemo(() => isFilterMenuOpened ? "hidden" : "", [isFilterMenuOpened]);

    const category = useMemo(() => searchParams.get("category"), [searchParams]);

    const onTagChange = useCallback((tags: number[]) => {
        setSelectedTags(tags);
        setPage(1);
    }, []);

    const handleCategoryChange = useCallback((category: string | null) => {
        if (category == null || category == "0") {
            searchParams.delete("category")
            setSearchParams(searchParams)
        } else {
            setSearchParams({ category: category })
        }
    }, [searchParams, setSearchParams]);

    const handlePageChange = useCallback((page: number) => {
        setPage(page + 1);
    }, []);

    return (
        <div className={'catalog-page'}>
            {/* Breadcrumb navigation bar hidden for now */}
            <div className="container">
                <h2 className={"catalog-header-text " + isVisible}>Service Catalog</h2>
                <div className={"row align-items-center header-row " + isVisible}>
                    <div className="col-lg-6">
                        <p className="font-md color-gray-500">We have<span
                            className="font-md-bold color-brand-3"> {pageStat ? pageStat.count : "XX"}</span><span> services now</span>
                        </p>
                    </div>
                    <div className="latest-added-block col-lg-6">
                        <div>
                            <span
                                className="font-sm color-gray-500 font-medium">Sort by:</span>
                            <div className="dropdown dropdown-sort ">
                                <button className="btn dropdown-toggle font-sm color-gray-900 font-medium"
                                    id="dropdownSort" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Latest added
                                </button>
                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort"
                                    style={{ margin: 0 }}>
                                    <li><a className="dropdown-item active" href="#">Latest added</a></li>
                                    <li><a className="dropdown-item" href="#">Oldest added</a></li>
                                </ul>
                            </div>
                        </div>
                        <FilterButton setIsFilterMenuOpened={setIsFilterMenuOpened} />
                    </div>

                    {/* <div className="col-lg-6 mb-30 text-end">
                        <a className="font-sm color-gray-900 mr-30" href="#">Add Service</a>
                    </div> */}
                </div>

                <div className="row">
                    <div className={"col-md-3 service-tags-column " + isOpenClassName}>
                        <CrossComponent setIsFilterMenuOpened={setIsFilterMenuOpened} />
                        <ServiceTags
                            selectedTagIds={selectedTags}
                            onTagChange={onTagChange}
                            category={category}
                            onCategoryChange={handleCategoryChange}
                            selectedCategory={category}
                        />
                    </div>
                    <div className={"col-md-9 catalog-column " + isVisible}>
                        <CatalogList selectedTagIds={selectedTags} page={page} setPageStat={setPageStat}
                            categoryId={category} />
                        {pageStat && pageStat.total_pages > 1 &&
                            <Pagination totalPages={pageStat.total_pages} forcePage={page - 1}
                                onPageChange={handlePageChange} />}
                    </div>
                </div>

                <div className="mt-5">
                </div>
            </div>
        </div>
    );
});

export default CatalogView