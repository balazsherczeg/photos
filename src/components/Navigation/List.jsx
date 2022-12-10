import React from 'react';
import styled from 'styled-components';
import useCategories from 'data/useCategories';
import useCategory from 'data/useCategory';
import Item from './Item';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 300px;
  right: 0;
  background: #fff;
`;

const List = () => {
  const categories = useCategories();
  const category = useCategory();

  return (
    <Wrapper>
      <Item to="/" active={category == null}>
        All
      </Item>

      {categories.map(({ slug, name }) => (
        <Item
          key={slug}
          to={`/category/${slug}`}
          active={slug === category}
          slug={slug}
        >
          {name}
        </Item>
      ))}
    </Wrapper>
  );
};

export default List;
