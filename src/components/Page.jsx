import React from 'react';
import styled from 'styled-components'

import Album from '../@packages/react-image-gallery';
import useItemsByCategory from '../data/useItemsByCategory';
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
        <Album
          items={items}
        />
      </Main>
    </>
  );
};

export default Page;
