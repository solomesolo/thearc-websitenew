import React from 'react'
import { Service, ServiceScreenshot } from '../../../api/types'
import "../styles/screenShots.scss"

type Props = {
  screenshots: ServiceScreenshot[],
}

export const ScreenShots = ({ screenshots }: Props) => {
  return (
    <div className='screenshots-block'>
      {screenshots.length > 0 &&
        <h2 className="color-brand-3 screenshots-title">Screenshots</h2>
      }
      <div className="screenshots-container">
        {screenshots.map((screenshot, index) => (
          <div className="screenshot" key={index}>
            <div className="screenshot-image">
              <img src={screenshot.image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
