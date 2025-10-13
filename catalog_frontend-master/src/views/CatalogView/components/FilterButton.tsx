import React from 'react'
import "../styles/filterButton.scss"
import filterIcon from "../../../assets/imgs/template/filters.svg"
export const FilterButton = ({ setIsFilterMenuOpened }: { setIsFilterMenuOpened: (previousState: boolean) => void }) => {

  const handleClick = () => {
    setIsFilterMenuOpened(true);
  }

  return (
    <div onClick={handleClick} className='filter-button-main'>
      <div className="filter-button-main-text">
        Filter
      </div>
      <img src={filterIcon} alt="filter" />
    </div>
  )
}
