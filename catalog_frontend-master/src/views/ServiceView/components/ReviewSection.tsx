import React, { useState } from 'react'
import "../styles/reviewSection.scss"
import { Paginated, Service, ServiceRatingReview } from '../../../api/types';
import ScaledRatingStars from '../../../components/ScaledRatingStars';
import { TotalReviewScore } from './TotalReviewScore';
import { ReviewCard } from './ReviewCard';
// import { CustomCarousel } from '../../../components/Carousel';
import arrow from "../../../assets/imgs/template/more-answers-button.svg"
import { CustomCarousel } from '../../../components/Carousel';



type ReviewsSectionProps = {
  reviews: Paginated<ServiceRatingReview>,
  service: Service

}
export const ReviewsSection = ({ reviews, service }: ReviewsSectionProps) => {
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const handleReadMoreClick = () => {
    setShowMoreReviews(true);
  };
  return (
    <div className='review-section'>
      <h2 className="color-brand-3 review-title">Reviews</h2>
      <div className="main-block">
        <div className="main-block-header">
          Customer questions & answers
        </div>
        <div className="main-block-reviews">
          <div className="main-block-reviews-left">
            <CustomCarousel reviews={reviews} showMoreReviews={showMoreReviews} />
            {reviews && reviews.results.length > 3 && !showMoreReviews && (
              <button className='read-more' onClick={handleReadMoreClick}>More Answers <img className='more-answers-arrow' src={arrow} /></button>
            )}
          </div>
          <div className="main-block-reviews-right">
            {service.ratings && service.ratings.length > 0 && <TotalReviewScore score={service.ratings[0].score} link={service.link} />}
          </div>
        </div>
      </div>
    </div>
  );
  {/* 
      <div className="row review-list">
        <div className="col-lg-8">
          <h4 className="mb-30 title-question">Customer questions &amp; answers</h4>
          <div className="comment-list">
            {reviews && reviews.results.map((review, index) => (
              <div className="single-comment justify-content-between d-flex mb-30 hover-up">
                <div className="user justify-content-between d-flex reviews">

                  <div className="thumb text-center">
                    <div style={{ width: 100 }}>
                      <img src="/assets/imgs/template/account.svg" alt=""
                        style={{ width: 50 }} />
                    </div>
                    <span className="font-xs"><b>{review.username}</b></span>
                  </div>

                  <div className="desc">
                    <div className="d-flex justify-content-between mb-10">
                      <div className="d-flex align-items-center"> */}
  {/*<span className="font-xs color-gray-700">December 4, 2022 at 3:12 pm</span>*/ }
  {/* </div>
                      <div className="d-inline-block">
                        <ScaledRatingStars score={review.score} />
                      </div> */}
  {/*<div className="product-rate d-inline-block">*/ }
  {/*<div className="product-rating" style={{width: "100%"}}></div>*/ }
  {/*</div>*/ }
  {/* </div>
                    <p className="mb-10 font-sm color-gray-900">
                      {review.text} */}
  {/*<a className="reply" href="#"> Reply</a>*/ }
  {/* </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {service.ratings && service.ratings.length > 0 && <TotalReviewScore score={service.ratings[0].score} link={service.link} />}

      </div> */}


};