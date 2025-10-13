import React from 'react'
import RatingComponent from '../../../../../components/RatingComponent'
import { BriefCategory, Rating } from '../../../../../api/types'

type CatalogItemSubHeaderProps = {
  ratings: Rating[],
  categories: BriefCategory[],
}

export const CatalogItemSubHeader = ({ ratings, categories }: CatalogItemSubHeaderProps) => {
  return (
    <div className="card-subheader">
      <div className="card-subheader-top">

        <div className="card-subheader-top-categories">
          <p className="card-subheader-top-categories-category">
            {categories && categories.map(c => (
              <span key={c.id}>{String(c.name || 'Unknown Category')}</span>))}</p>
        </div>
        <div className="card-subheader-top-ratings">
          {ratings && ratings.length > 0 &&
            <RatingComponent rating={ratings[0]} />}
        </div>
      </div>
      {/* <ul className="card-subheader-bot-feature-list">
        <li className="card-subheader-bot-feature-list-item">
          <div className="dot"></div>
          Available consultation with GP
        </li>
        <li className="card-subheader-bot-feature-list-item">
          <div className="dot"></div>
          Time to result <span>(will be like 1-2 days)</span>
        </li>

      </ul> */}
    </div>
  )
}
