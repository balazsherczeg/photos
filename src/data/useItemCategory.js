import useCategories from './useCategories';
import useItem from './useItem';

const useItemCategory = (id) => {
  const categories = useCategories();
  const item = useItem(id);
  return categories.find(({ id: categoryId }) => categoryId === item.category);
};

export default useItemCategory;
