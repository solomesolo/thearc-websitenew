import { useState } from "react"
import "../styles/priceRangeDropdown.scss"
import { PriceRangeDropDownOption } from "./PriceRangeDropDownOption"
import arrowDropDown from "../../../assets/imgs/template/Arrow drop up.svg"
const options = ["any", "29.99 EUR", "49.99 EUR", "60.99 EUR", "100.99 EUR"]

export const PriceRangeDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState("any")
  let activeClassname = isOpen ? "active" : ""

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="price-range-dropdown">
      <div className="price-range-dropdown-text">
        from
      </div>
      <div onClick={handleClick} className="price-range-dropdown-header">
        <div className="price-range-dropdown-header-text">
          {selectedPrice}
          <img src={arrowDropDown} alt="arrow" className={"price-range-dropdown-header-text-arrow " + activeClassname} />
        </div>
        <div className={"price-range-dropdown-header-items " + activeClassname}>
          {options.map(option => {
            const selectedClass = option === selectedPrice ? "selected" : ""
            return <PriceRangeDropDownOption text={option} key={option} selectedClass={selectedClass} setSelectedPrice={setSelectedPrice} />
          }

          )}
        </div>
      </div>
    </div>
  )
}
