import React from 'react'
import ISOIconComponent from '../../../../../components/ISOIconComponent'
import { BriefServiceTag, Certificates } from '../../../../../api/types'

type CatalogItemDescriptionProps = {
  tags: BriefServiceTag[],
  description: string,
  certificates: Certificates[],
}

export const CatalogItemDescription = ({ description, tags, certificates }: CatalogItemDescriptionProps) => {
  return (
    <div className="description-block">
      <p className="description-block-text-main">
        {String(description || '').slice(0, 250) + "..."}
      </p>
      <div className='description-block-bottom'>
        <div className="description-block-text-secondary">
          {tags && tags.map(t => {
            return (
              <div className="text" key={t.id}>
                {String(t.name || 'Unknown Tag')}
              </div>)
          })}

        </div>
        <p className="description-block-certificates">
          {certificates && certificates.map((c, i) => (
            <div key={i} className="certificate">
              <ISOIconComponent cert={c} idx={i} />
            </div>
          ))}
        </p>

      </div>

    </div>
  )
}
