import React from 'react';
import { ItemType } from 'models/Item';
import styled from 'styled-components';
import { SizeType } from '@packages/Gallery/models/LayoutCache';
import Picture from '../Picture/Picture';
import Caption from './Caption';
import ImageSizer from './ImageSizer';

const getOffset = (index: number) => `${index * 100}vw`;

const Main = styled.div`
  box-sizing: border-box;
  height: 100vh;
  padding: 1rem 1rem 3rem;
  position: absolute;
  width: 100vw;
  z-index: 10;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;

  & > * {
    flex: none;
  }
`;

const CaptionPositioned = styled(Caption)`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 12;
`;

const Item = ({ item, index }: { item: ItemType; index: number }) => {
  return (
    <Main
      className="VMG__CarrouselItem"
      style={{
        left: getOffset(index),
      }}
    >
      <Inner className="VMG__CarrouselItem__inner">
        <ImageSizer item={item}>
          <Picture item={item} size={{} as SizeType} />
        </ImageSizer>
        <CaptionPositioned item={item} />
      </Inner>
    </Main>
  );
};

export default Item;
