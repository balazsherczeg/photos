import { useState, useEffect } from 'react';
import { Item } from 'models/Item';
import useCategories from './useCategories';
import useCategory from './useCategory';
import useItems from './useItems';
import { getCategoryBySlug } from './utils';

const useItemsByCategory = (): Item[] => {
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
        const filteredData = allItems.filter(
          (item: Item) => item.category === category.id
        );
        setItems(filteredData);
      }
    }
  }, [allItems, categorySlug, categories]);

  return items;
};

export default useItemsByCategory;
