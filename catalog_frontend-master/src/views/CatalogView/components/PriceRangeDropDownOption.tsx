import React from 'react'

export const PriceRangeDropDownOption = ({ text, selectedClass, setSelectedPrice }: { text: string, selectedClass: string, setSelectedPrice: (price: string) => void }) => {
  const handleClick = (e: any) => {
    setSelectedPrice(e.target.innerHTML)
  }
  return (
    <div onClick={handleClick} className={'price-range-dropdown-option ' + selectedClass}>{text}</div>
  )
}
