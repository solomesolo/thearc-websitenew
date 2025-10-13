import React from 'react'

export const CatalogItemHeader = ({ name }: { name: string }) => {
  return (
    <div className="catalog-item-card-description-header">
      <div className="catalog-item-card-description-header-name">
        {name}
      </div>
      {/* <div className="catalog-item-card-description-header-price">
        <span>
          from
        </span>
        29.99 EUR
      </div> */}
    </div>

  )
}
