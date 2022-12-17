import React from 'react';
import { TaxonomyTypes } from 'models/Taxonomy';
import useCategories from 'data/useCategories';
import useTaxonomy from 'data/useTaxonomy';
import Item from './Item';

const Categories = () => {
  const categories = useCategories();
  const { taxonomyType, taxonomyValue } = useTaxonomy();

  return (
    <div>
      <Item to="/" active={taxonomyType == null}>
        All
      </Item>

      {categories.map(({ slug, name }) => (
        <Item
          key={slug}
          to={`/category/${slug}`}
          active={
            taxonomyType === TaxonomyTypes.CATEGORY && slug === taxonomyValue
          }
          slug={slug}
        >
          {name}
        </Item>
      ))}
    </div>
  );
};

export default Categories;
