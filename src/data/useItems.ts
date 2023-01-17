import { useState, useEffect, useMemo } from 'react';
import { ItemType } from 'models/Item';
import { TaxonomyTypes } from 'models/Taxonomy';
import useCategories from './useCategories';
import useData from './useData';
import useTaxonomy from './useTaxonomy';
import { getCategoryIdBySlug } from './utils';

// If no category, we sort as a blog
const sortByDateDescFn = (a: ItemType, b: ItemType) => {
  if (a.meta.date === b.meta.date) {
    return a.id < b.id ? 1 : -1;
  } else {
    return a.meta.date < b.meta.date ? 1 : -1;
  }
};

const useItems = (): ItemType[] => {
  const { items: allItems = [] } = useData();
  const { taxonomyValue, taxonomyType } = useTaxonomy();
  const categories = useCategories();

  const [items, setItems] = useState<ItemType[]>([]);

  const allItemsSorted = useMemo(
    () => [...allItems].sort(sortByDateDescFn),
    [allItems]
  );

  useEffect(() => {
    if (taxonomyType === TaxonomyTypes.CATEGORY && taxonomyValue != null) {
      const categoryId = getCategoryIdBySlug(taxonomyValue, categories);

      const filteredData = allItems.filter(
        (item: ItemType) => item.category === categoryId
      );
      setItems(filteredData);
    }

    if (taxonomyType === TaxonomyTypes.TAG && taxonomyValue != null) {
      const filteredData = allItems.filter(
        (item: ItemType) => item.tags?.indexOf(taxonomyValue) > -1
      );
      setItems(filteredData);
    }

    // All items, no category
    if (taxonomyType == null) {
      setItems(allItemsSorted);
    }
  }, [allItems, allItemsSorted, categories, taxonomyType, taxonomyValue]);

  return items;
};

export default useItems;
