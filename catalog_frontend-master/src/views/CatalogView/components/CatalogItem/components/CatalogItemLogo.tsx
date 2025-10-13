import React from 'react'

export const CatalogItemLogo = ({ logo }: { logo: string, }) => {
  return (
    <div className="catalog-item-card-logo">
      <img src={logo} alt="" />
    </div >
  )
}
