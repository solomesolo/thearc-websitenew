import React, { useMemo } from 'react';
import {Rating} from "../api/types";

type Props = {
    rating: Rating,
    link?: string,
}

const RatingComponent = React.memo(({rating, link}: Props) => {
    const trust = useMemo(() => {
        if (link) {
            return "https://www.trustpilot.com/review/" + link.replace("https://", "");
        }
        return "";
    }, [link]);

    const stars = useMemo(() => {
        const starArray = [];
        for (let i = 0; i < 5; i++) {
            const img = Math.round(rating.score || 0) > i ? "star.svg" : "star-gray.svg";
            const link = "/assets/imgs/template/icons/" + img;
            starArray.push(<img key={i} src={link} alt="star"/>);
        }
        return starArray;
    }, [rating.score || 0]);

    // if (rating.score == 0) {
    //     return <></>
    // }

    return (
        <>
            <div className="rating">
                <a href={trust}>
                    {stars}
                    <span className="font-xs color-gray-500"> {rating.score || 0}</span>
                </a>
            </div>
        </>
    )
});

export default RatingComponent;