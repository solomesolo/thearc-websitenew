import { PriceRangeDropDown } from './PriceRangeDropDown'
import "../styles/priceRange.scss"

export const PriceRange = () => {
  return (
    <div className='price-range-main'>
      <h5>
        Price range
      </h5>
      <PriceRangeDropDown />
    </div>
  )
}
