import {useState, useEffect} from 'react';
import useCategory from './useCategory';
import useCategories from './useCategories';
import useItems from './useItems';
import {getCategoryBySlug} from './utils';

const useItemsByCategory = () => {
  const categorySlug = useCategory();
  const categories = useCategories();
  const allItems = useItems();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const category = getCategoryBySlug(categorySlug, categories);

    switch (category) {
      case false: // All items, no category
        setItems(allItems);
        break;
      case null: // No category yet
        setItems([]);
        break;
      default: {
        const filteredData = allItems.filter((item) => item.category === category.id);
        setItems(filteredData);
      }
    }
  }, [allItems, categorySlug, categories]);

  return items;
};

export default useItemsByCategory;
