import React from 'react';
import cc from 'classcat';
import { Link } from 'gatsby';
import styled from 'styled-components';
import useTags from 'data/useTags';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

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

const Tags = ({
  tags,
  activeTag,
}: {
  tags: string[];
  activeTag?: string | null;
}) => {
  const allTags = useTags();

  return (
    <Root>
      {tags.map((slug) => (
        <Link
          to={`/tag/${slug}`}
          key={slug}
          className={cc({
            active: slug === activeTag,
          })}
        >
          {allTags[slug]}
        </Link>
      ))}
    </Root>
  );
};

export default Tags;
