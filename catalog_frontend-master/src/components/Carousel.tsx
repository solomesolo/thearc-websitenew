
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "../views/ServiceView/styles/swiperStyles.scss"
import 'swiper/css/bundle';
import { ReviewCard } from '../views/ServiceView/components/ReviewCard';

export const CustomCarousel = React.memo(({ reviews, showMoreReviews }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  const updateMobileState = useCallback(() => {
    setIsMobile(window.innerWidth < 460);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateMobileState);
    updateMobileState(); // Set initial state
    return () => window.removeEventListener('resize', updateMobileState);
  }, [updateMobileState]);

  const mobileReviews = useMemo(() => {
    if (!reviews?.results) return [];
    return reviews.results.slice(
      reviews.results.length - 5 || 0, 
      showMoreReviews ? reviews.results.length : reviews.results.length - 1
    );
  }, [reviews, showMoreReviews]);

  const desktopReviews = useMemo(() => {
    if (!reviews?.results) return [];
    return reviews.results.slice(0, showMoreReviews ? reviews.results.length : 3);
  }, [reviews, showMoreReviews]);

  if (isMobile) {
    return (
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {mobileReviews.map((review: any, index: number) => (
          <SwiperSlide key={`${review.id || index}-mobile`}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <>
      {desktopReviews.map((review: any, index: number) => (
        <ReviewCard key={`${review.id || index}-desktop`} review={review} />
      ))}
    </>
  );
});