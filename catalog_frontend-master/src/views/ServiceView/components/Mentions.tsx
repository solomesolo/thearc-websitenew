import React, { ReactNode } from 'react'
import { Service } from '../../../api/types'
import { MentionCard } from './MentionCard'
import { Link } from 'react-router-dom'
import "../styles/mentions.scss"

export const Mentions = ({ service, domainFromUrl }: { service: Service, domainFromUrl: (link: string) => ReactNode }) => {
  return (
    <div className='mention-main'>
      {service.mentions.length > 0 &&
        <h3>Mentions</h3>
      }
      <div className='cards-box'>
        {service.mentions.map((mention, index) => (
          <MentionCard mainText={mention.text} headerText={mention.name} link={mention.link} key={index} />
        ))}
      </div>
    </div>
  )
}
