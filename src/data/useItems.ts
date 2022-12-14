import { useState, useEffect } from 'react';
import { Item } from 'models/Item';
import { TaxonomyTypes } from 'models/Taxonomy';
import useCategories from './useCategories';
import useData from './useData';
import useTaxonomy from './useTaxonomy';
import { getCategoryIdBySlug } from './utils';

// If no category, we sort as a blog
const sortByDateDescFn = (a: Item, b: Item) =>
  a.meta.date === b.meta.date ? a.id < b.id : a.meta.date < b.meta.date;

// Within a category, we sort as a story
const sortByDateAscFn = (a: Item, b: Item) =>
  a.meta.date === b.meta.date ? a.id < b.id : a.meta.date > b.meta.date;

const useItems = (): Item[] => {
  const { items: allItems = [] } = useData();
  const { taxonomyValue, taxonomyType } = useTaxonomy();
  const categories = useCategories();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (taxonomyType === TaxonomyTypes.CATEGORY && taxonomyValue != null) {
      const categoryId = getCategoryIdBySlug(taxonomyValue, categories);

      const filteredData = allItems.filter(
        (item: Item) => item.category === categoryId
      );
      filteredData.sort(sortByDateAscFn);
      setItems(filteredData);
    }

    if (taxonomyType === TaxonomyTypes.TAG && taxonomyValue != null) {
      const filteredData = allItems.filter(
        (item: Item) => item.tags?.indexOf(taxonomyValue) > -1
      );
      filteredData.sort(sortByDateAscFn);
      setItems(filteredData);
    }

    // All items, no category
    if (taxonomyType == null) {
      allItems.sort(sortByDateDescFn);
      setItems(allItems);
    }
  }, [allItems, categories, taxonomyType, taxonomyValue]);

  return items;
};

export default useItems;
