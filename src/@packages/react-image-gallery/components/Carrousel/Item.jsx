import React from 'react';
import {object, number} from 'prop-types';
import styled from 'styled-components';

import ImageSizer from './ImageSizer';
import Image from '../Image';
import Caption from './Caption';

const getOffset = (index) => `${index * 100}vw`;

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

const Item = ({
  item,
  index,
}) => (
  <Main
    className="VMG__CarrouselItem"
    style={{
      left: getOffset(index),
    }}
  >
    <Inner className="VMG__CarrouselItem__inner">
      <ImageSizer item={item}>
        <Image item={item} />
      </ImageSizer>
      <CaptionPositioned item={item} />
    </Inner>
  </Main>
);

Item.propTypes = {
  item: object.isRequired,
  index: number.isRequired,
};

export default Item;
