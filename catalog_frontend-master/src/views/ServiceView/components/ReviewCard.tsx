import React, { useState } from 'react'
import { Paginated, ServiceRatingReview } from '../../../api/types'
import avatar from "../../../assets/imgs/template/account-avatar.svg"
import ScaledRatingStars from '../../../components/ScaledRatingStars'
import "../styles/reviewCard.scss"

type Props = {
  review: ServiceRatingReview,
}

export const ReviewCard = ({ review }: Props) => {

  const [readMoreText, setReadMoreText] = useState(false)
  const [isBigger, setIsBigger] = useState(review.text.length > 600)

  const handleClick = (value: boolean) => (e: any) => {
    e.preventDefault()
    setReadMoreText(value)
  }

  const getText = () => {
    if (isBigger) {
      return (
        <>
          {readMoreText ?
            <>{review.text} <a href={"#"} onClick={handleClick(!readMoreText)}>Collapse</a></> :
            <>{review.text.slice(0, 600)}... <a href={"#"} onClick={handleClick(true)}>Read more</a></>}
        </>
      )
    }
    else {
      return <>{review.text}</>
    }
  }



  return (
    <div className='review-card'>
      <div className="review-left-part">
        <div className="review-image-container">
          <img src={avatar} alt="" />
        </div>
        <div className="reviewer-username">
          {review.username}
        </div>
        <ScaledRatingStars score={review.score} />
      </div>
      <div className="review-right-part">
        <div className="review-header">
          {review.title}
        </div>
        <div className="review-main-text">
          {getText()}
        </div>
      </div>
    </div>
  )
}
