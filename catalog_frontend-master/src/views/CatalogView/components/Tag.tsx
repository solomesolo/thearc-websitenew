import React from 'react'
import { ServiceTag } from '../../../api/types'
import "../styles/tag.scss"
import checkMark from "../../../assets/imgs/template/checkMark.svg"

type TagProps = {
  menuLinkClass: string,
  selectedTagIds: number[],
  onTagChange: (tagIds: number[]) => void,
  tag: ServiceTag
}
export const Tag = ({ menuLinkClass, selectedTagIds, onTagChange, tag }: TagProps) => {

  const handleClick = () => {
    let newSelectedTagIds = [...selectedTagIds];
    if (newSelectedTagIds.includes(tag.id)) {
      newSelectedTagIds = newSelectedTagIds.filter(id => id !== tag.id);
    } else {
      newSelectedTagIds.push(tag.id);
    }
    onTagChange(newSelectedTagIds);

  }

  // Safely render tag name as string
  const tagName = typeof tag.name === 'string' ? tag.name : String(tag.name || 'Unknown Tag');

  return (
    <div className={"tag " + menuLinkClass} onClick={handleClick}>
      <div className='tag__round'><img src={checkMark} className={"inner-check-mark " + menuLinkClass}></img></div>
      <div className="text-container">
        {tagName}
      </div>
    </div>
  )
}
