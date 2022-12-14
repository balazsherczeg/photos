import { useEffect, useState } from 'react';
import { useMatch } from '@reach/router';
import { TaxonomyTypes } from 'models/Taxonomy';

const useTaxonomy = () => {
  const categoryMatch = useMatch('/category/:category');
  const tagMatch = useMatch('/tag/:tag');
  const itemMatch = useMatch('/item/:item');

  const [taxonomyType, setTaxonomyType] = useState<TaxonomyTypes | null>(null);
  const [taxonomyValue, setTaxonomyValue] = useState<string | null>(null);

  useEffect(() => {
    if (categoryMatch) {
      setTaxonomyType(TaxonomyTypes.CATEGORY);
      setTaxonomyValue(categoryMatch.category);
    } else if (tagMatch) {
      setTaxonomyType(TaxonomyTypes.TAG);
      setTaxonomyValue(tagMatch.tag);
    } else if (!itemMatch) {
      setTaxonomyType(null);
      setTaxonomyValue(null);
    }
  }, [categoryMatch, itemMatch, tagMatch]);

  return { taxonomyType, taxonomyValue };
};

export default useTaxonomy;
