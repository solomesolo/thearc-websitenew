import React from 'react'
import "./customButton.scss"
import arrow from "../../assets/imgs/template/company-site-button-arrow.svg"
import { Link } from 'react-router-dom'


export const CustomButton = ({ text, link }: { text: string, link: string }) => {
  return (
    <Link to={link}>
      <button className='cta-01 custom-button' >
        <span>
          {text}
        </span>
        <img src={arrow} />
      </button>
    </Link>
  )
}
