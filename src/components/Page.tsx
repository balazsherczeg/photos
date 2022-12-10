import React from 'react';
import styled from 'styled-components';
import Gallery from '@packages/Gallery';
import useItemsByCategory from 'data/useItemsByCategory';
import Header from './Header';

const Main = styled.div`
  padding: 0 16px 32px;
`;

const Page = () => {
  const items = useItemsByCategory();

  return (
    <>
      <Header />
      <Main>
        <Gallery items={items} />
      </Main>
    </>
  );
};

export default Page;
