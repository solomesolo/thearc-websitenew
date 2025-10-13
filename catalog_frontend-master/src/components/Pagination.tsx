import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate'
import "./pagination.scss"

type Props = {
    totalPages: number
    forcePage: number
    onPageChange: (page: number) => void
}

const Pagination = React.memo((props: Props) => {
    const handlePageChange = useCallback(({ selected }: { selected: number }) => {
        props.onPageChange(selected);
    }, [props.onPageChange]);

    return (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            pageClassName={'page-item'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            containerClassName={'pagination pagination-custom'}
            activeClassName={'active'}
            pageCount={props.totalPages}
            forcePage={props.forcePage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={7}
            onPageChange={handlePageChange}
        />
    );
});

export default Pagination;