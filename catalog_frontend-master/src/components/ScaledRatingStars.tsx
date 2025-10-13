import React from 'react';

type Props = {
    score: number
}
const ScaledRatingStars = (props: Props) => {
    return (
        <>
            <div className="product-rate d-inline-block mr-15">
                <div className="product-rating" style={{width: `${props.score * 20}%`}}></div>
            </div>
        </>
    )
};

export default ScaledRatingStars;