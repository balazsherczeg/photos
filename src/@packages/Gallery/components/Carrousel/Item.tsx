import React from 'react';
import { ItemType } from 'models/Item';
import styled from 'styled-components';
import { SizeType } from '@packages/Gallery/models/LayoutCache';
import Picture from '../Picture/Picture';
import Caption from './Caption';
import ImageSizer from './ImageSizer';

const getOffset = (index: number) => `${index * 100}vw`;

const Root = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 1rem 1rem 3rem;
  position: absolute;
  width: 100vw;
  z-index: 10;

  & .captionPosititoner {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 12;
  }
`;

const Item = ({ item, index }: { item: ItemType; index: number }) => {
  return (
    <Root
      style={{
        left: getOffset(index),
      }}
    >
      <ImageSizer item={item}>
        <Picture item={item} size={{} as SizeType} />
      </ImageSizer>
      <div className="captionPositioner">
        <Caption item={item} />
      </div>
    </Root>
  );
};

export default Item;
