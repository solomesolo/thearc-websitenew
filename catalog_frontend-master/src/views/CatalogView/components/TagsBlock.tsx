import React, { useState } from 'react'
import { Paginated, ServiceTag } from '../../../api/types';
import { Tag } from './Tag';
import Loader from '../../../components/Loader';
import "../styles/tagsBlock.scss"


type TagsBlock = {
  tags: Paginated<ServiceTag> | undefined,
  selectedTagIds: number[],
  onTagChange: (tagIds: number[]) => void,
}
export const TagsBlock = ({ tags, selectedTagIds, onTagChange }: TagsBlock) => {
  if (!tags) {
    return <Loader />
  }
  const [newSelectedTagIds, setNewSelectedTagIds] = useState<number[]>([])

  const isButtonsVisible = newSelectedTagIds.length !== 0 ? "visible" : "";

  const handleApply = () => {
    onTagChange(newSelectedTagIds)
  }

  const handleClear = () => {
    setNewSelectedTagIds([])
    onTagChange([])
  }
  const handleTagChange = (updatedSelectedTagIds: number[]) => {
    setNewSelectedTagIds(updatedSelectedTagIds)
  }


  return (
    <div className="box-slider-item tags-block-main">
      <div className="head pb-15 ">
        <h5 className="color-gray-900">Services by tags</h5>
      </div>
      <div className="content-slider tags-container scrollbar">
        {tags.results.map((tag: ServiceTag) => {
          let menuLinkClass = newSelectedTagIds.includes(tag.id) ? "active" : "";
          return (
            <Tag menuLinkClass={menuLinkClass} onTagChange={handleTagChange} tag={tag} selectedTagIds={newSelectedTagIds} key={tag.id} />
          )
        })}
      </div>
      <div className={"buttons-block " + isButtonsVisible}>
        <button onClick={handleApply} className='apply-button cta-01'><span>Apply</span></button>
        <button onClick={handleClear} className='reset-button cta-02'><span>Clear ({newSelectedTagIds.length})</span></button>
      </div>
    </div>



  )
}
