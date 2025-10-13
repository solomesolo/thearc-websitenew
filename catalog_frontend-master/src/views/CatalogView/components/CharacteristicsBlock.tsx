import React from 'react'
import { CheckBoxSlider } from './CheckBoxSLider'
import "../styles/characteristicsBlock.scss"

export const CharacteristicsBlock = () => {
  return (
    <div className='characteristics-main'>
      <h5>
        Characteristics
      </h5>
      <div className="characteristics-items">
        <div className="first-characteristic characteristic">
          <div className="first-characteristic-text">
            Consultation with GP
          </div>
          <CheckBoxSlider />
        </div>
        <div className="second-characteristic characteristic">
          <div className="second-characteristic-text">
            Time to result
            <div className="second-characteristic-text-subtext">
              (will be like 1-2 days)
            </div>
          </div>
          <CheckBoxSlider />
        </div>
      </div>
    </div>
  )
}
