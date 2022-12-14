import React from 'react';
import styled from 'styled-components';
import Gallery from '@packages/Gallery';
import useItems from 'data/useItems';
import Header from './Header';

const Main = styled.div`
  padding: 0 16px 32px;
`;

const Page = () => {
  const items = useItems();

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
