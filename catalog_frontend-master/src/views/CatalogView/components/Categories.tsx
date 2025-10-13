import { Category } from "../../../api/types";
import Loader from "../../../components/Loader";
import { CategoryBlockProps } from "./CategoryBlock";
import "../styles/categories.scss"

export type CategoriesProps = {
    menuLinkClass: string,
    onCategoryChange: (categoryId: string | null) => void,
    allActiveCLass: string,
    category: Category,
    selectedCategory: string | null
}

export const Categories = ({ menuLinkClass, onCategoryChange, allActiveCLass, category, selectedCategory }: CategoriesProps) => {
    // Safely render category name as string
    const categoryName = typeof category.name === 'string' ? category.name : String(category.name || 'Unknown Category');
    const categoryCount = typeof category.count === 'string' ? category.count : String(category.count || '0');

    return (
        <div className="category-container">
            <li className={menuLinkClass + " " + "category-item"}
                onClick={e => {
                    if (selectedCategory == category.id.toString()) {
                        onCategoryChange(null);
                    } else {
                        onCategoryChange(category.id.toString());
                    }
                }}>
                <div className={"categories-list-nav-item "}>
                    <div className='round'><div className={"inner-round " + menuLinkClass + " " + allActiveCLass}></div></div>
                    {categoryName} <div className="categories-list-nav-item-number">({categoryCount})</div>
                </div>
            </li>
        </div>
    )
}
