import { Category } from 'models/Category';
import useData from './useData';

const useCategories = (): Category[] => {
  const { categories } = useData();

  return categories || [];
};

export default useCategories;
