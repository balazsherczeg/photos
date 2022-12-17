import React from 'react';
import cc from 'classcat';
import { Link } from 'gatsby';
import { TaxonomyTypes } from 'models/Taxonomy';
import styled from 'styled-components';
import useTags from 'data/useTags';
import useTaxonomy from 'data/useTaxonomy';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-left: -2px;
  padding: 0.5rem 1rem 0 2rem;

  a {
    background-color: #eee;
    border-radius: 1rem;
    color: #000;
    font-size: var(--font-size-smaller-1);
    padding: 0.25rem 0.5rem;
    opacity: 0.8;
    text-decoration: none;
    letter-spacing: 0.03rem;

    &:hover {
      background-color: #ccc;
    }

    &.active {
      background-color: #999;
      color: #fff;
    }
  }
`;

const Tags = () => {
  const tags = useTags();
  const { taxonomyType, taxonomyValue } = useTaxonomy();

  return (
    <Root>
      {Object.keys(tags).map((slug) => (
        <Link
          to={`/tag/${slug}`}
          key={slug}
          className={cc({
            active:
              taxonomyType === TaxonomyTypes.TAG && slug === taxonomyValue,
          })}
        >
          {tags[slug]}
        </Link>
      ))}
    </Root>
  );
};

export default Tags;
