import { useState, useEffect } from 'react';
import { Item } from 'models/Item';
import useAllItems from './useAllItems';
import useCategories from './useCategories';
import useCategory from './useCategory';
import { getCategoryBySlug } from './utils';

// If no category, we sort as a blog
const sortByDateDescFn = (a: Item, b: Item) =>
  a.meta.date === b.meta.date ? a.id < b.id : a.meta.date < b.meta.date;

// Within a category, we sort as a story
const sortByDateAscFn = (a: Item, b: Item) =>
  a.meta.date === b.meta.date ? a.id < b.id : a.meta.date > b.meta.date;

const useItems = (): Item[] => {
  const categorySlug = useCategory();
  const categories = useCategories();
  const allItems = useAllItems();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const category = getCategoryBySlug(categorySlug, categories);

    switch (category) {
      case false: // All items, no category
        allItems.sort(sortByDateDescFn);
        setItems(allItems);
        break;
      case null: // No category yet
        setItems([]);
        break;
      default: {
        const filteredData = allItems.filter(
          (item: Item) => item.category === category.id
        );
        filteredData.sort(sortByDateAscFn);
        setItems(filteredData);
      }
    }
  }, [allItems, categorySlug, categories]);

  return items;
};

export default useItems;
