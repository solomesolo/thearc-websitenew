import React from 'react'
import "../styles/flagCard.scss"
import { Link } from 'react-router-dom'

type FlagCardProps = { flag: string, isInDevelopment: boolean, countryName: string, link: string, onClick: () => void, additionalClass: string }



export const FlagCard = ({ flag, isInDevelopment, countryName, link, onClick, additionalClass }: FlagCardProps) => {
  return (
    <div className='flag-card-main' onClick={onClick}>
      {isInDevelopment && <div className='card-overlay'>
        <div className="text-block">
          In development
        </div>
      </div>}
      <div className="flag-container" >
        <div className={`flag  ${additionalClass}`} ></div>
      </div>
      <div className='text'>
        {countryName}
      </div>

    </div>
  )
}