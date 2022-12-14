import React from 'react';
import { TaxonomyTypes } from 'models/Taxonomy';
import styled from 'styled-components';
import useTags from 'data/useTags';
import useTaxonomy from 'data/useTaxonomy';
import Item from './Item';

const Root = styled.div``;

const Tags = () => {
  const tags = useTags();
  const { taxonomyType, taxonomyValue } = useTaxonomy();

  return (
    <Root>
      {Object.keys(tags).map((slug) => (
        <Item
          key={slug}
          to={`/tag/${slug}`}
          active={taxonomyType === TaxonomyTypes.TAG && slug === taxonomyValue}
          slug={slug}
        >
          {tags[slug]}
        </Item>
      ))}
    </Root>
  );
};

export default Tags;
