import { useEffect, useState } from 'react';
import { useMatch } from '@reach/router';

const useCategory = () => {
  const categoryMatch = useMatch('/category/:category');
  const itemMatch = useMatch('/item/:item');

  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (categoryMatch) {
      setCategory(categoryMatch.category);
    } else if (!itemMatch) {
      setCategory(null);
    }
  }, [categoryMatch, itemMatch]);

  return category;
};

export default useCategory;
