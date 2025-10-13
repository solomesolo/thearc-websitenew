import React from 'react'
import crossIcon from "../../../assets/imgs/template/cross.svg"

export const CrossComponent = ({ setIsFilterMenuOpened }: { setIsFilterMenuOpened: (previousState: boolean) => void }) => {
  const handleClick = () => {
    setIsFilterMenuOpened(false)
  }
  return (
    <img className='cross hidden' onClick={handleClick} src={crossIcon} />
  )
}
