import React, {useEffect, useState} from 'react';
import {arrayOf, elementType, func, object} from 'prop-types';
import styled from 'styled-components';

import {useWindowSize, useScroll, useContainerSize} from '../hooks';
import calculateMasonry from './calculateMasonry';
import getVisibleItems from './getVisibleItems';
import renderItems from './renderItems';

const MasonryStyled = styled.div`
  position: relative;
`;

const Masonry = ({
  items,
  itemComponent,
  handleClick,
}) => {
  const {height: windowHeight} = useWindowSize();
  const {y: scrollTop} = useScroll();
  const {ref: containerRef, width: containerWidth} = useContainerSize();

  const [layoutCache, setLayoutCache] = useState({});
  const [renderedItems, setRenderedItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
      setLayoutCache(
      calculateMasonry({items, containerWidth}),
    );
  }, [
    containerWidth,
    items,
  ]);

  useEffect(() => {
    if (layoutCache.positions) {
        setRenderedItems(
        renderItems({items, itemComponent, handleClick}, layoutCache),
      );
    }
  }, [ // eslint-disable-line
    layoutCache,
  ]);

  useEffect(() => {
    if (renderedItems.length) {
      setVisibleItems(
        getVisibleItems(renderedItems, layoutCache, windowHeight, scrollTop),
      );
    }
  }, [ // eslint-disable-line
    renderedItems,
    scrollTop,
    windowHeight,
  ]);

  const {containerHeight} = layoutCache;

  return (
    <MasonryStyled
      className="VMG__Masonry"
      style={{height: containerHeight}}
      ref={containerRef}
    >
      {visibleItems}
    </MasonryStyled>
  );
};

Masonry.propTypes = {
  items: arrayOf(object).isRequired,
  itemComponent: elementType.isRequired,
  handleClick: func.isRequired,
};

export default Masonry;
