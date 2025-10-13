import React, { useState } from 'react'
import "../styles/checkBoxSlider.scss"

export const CheckBoxSlider = () => {
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };
  return (
    <div className={`checkbox-slider-container ${isChecked ? 'checked' : ''}`} onClick={toggleCheckbox}>
      <div className="checkbox-slider">
        <div className="slider" />
      </div>
    </div>
  )
}
