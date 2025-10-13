import React from 'react'
import { CustomButton } from '../../../components/customButton/CustomButton'
import "../styles/mentionCard.scss"

export const MentionCard = ({ mainText, headerText, link }: { mainText: string, headerText: string, link: string }) => {
  return (
    <div className="mention-card-main">
      <div className="card-header-text">{headerText}</div>
      <div className="card-main-text">{mainText.length > 250 ? mainText.slice(0, 250) + "..." : mainText}</div>
      <CustomButton text="Read More" link={link} />
    </div>
  )
}
