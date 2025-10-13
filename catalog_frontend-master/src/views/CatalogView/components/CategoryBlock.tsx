import React from 'react'
import { Categories } from './Categories'
import { AxiosError } from 'axios'
import { Category, Paginated } from '../../../api/types'
import Loader from '../../../components/Loader'
import "../styles/categoryBlock.scss"

export type CategoryBlockProps = {
  data: Paginated<Category> | undefined,
  loading: boolean,
  error: AxiosError<any, any> | null,
  onCategoryChange: (categoryId: string | null) => void,
  selectedCategory: string | null,
}

export const CategoryBlock = ({ data, loading, error, selectedCategory, onCategoryChange }: CategoryBlockProps) => {
  if (loading || !data) {
    return <Loader />
  }
  if (error) {
    return <Loader />
  }

  const allCount = data.results.reduce((acc: number, category: Category) => {
    return acc + Number(category.count);
  }, 0)
  const newCategories = [{
    id: 0, name: "All",
    description: "",
    count: allCount.toString()
  }, ...data.results]


  return (
    <div className="sidebar-categories">
      <div className="sidebar-header-container">
        <h6 className="text">Services by category</h6>
      </div>
      <div className="sidebar-categories-content">
        <ul className="list-nav-arrow">
          {
            newCategories.map((category: Category) => {

              let menuLinkClass = selectedCategory == category.id.toString() ? "active" : "";
              let allActiveCLass = selectedCategory == null && category.name == "All" ? "active" : ""

              return <Categories onCategoryChange={onCategoryChange} key={category.id} menuLinkClass={menuLinkClass} allActiveCLass={allActiveCLass} category={category} selectedCategory={selectedCategory} />
            })
          }
        </ul>
      </div>
    </div>
  )
}
