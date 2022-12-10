import React, { useEffect, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import { Item as ItemType } from 'models/Item';
import styled from 'styled-components';
import { LayoutCache } from '@packages/Gallery/models/LayoutCache';
import { useWindowSize, useScroll } from '../hooks';
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
}: {
  items: ItemType[];
  itemComponent: (props: any) => JSX.Element;
  handleClick: (index: number) => void;
}) => {
  const { height: windowHeight } = useWindowSize();
  const { y: scrollTop } = useScroll();
  const { observe: containerRef, width: containerWidth } = useDimensions();

  const [layoutCache, setLayoutCache] = useState<LayoutCache>(
    {} as LayoutCache
  );
  const [renderedItems, setRenderedItems] = useState<JSX.Element[]>([]);
  const [visibleItems, setVisibleItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setLayoutCache(calculateMasonry({ items, containerWidth }));
  }, [containerWidth, items]);

  useEffect(() => {
    if (layoutCache.positions) {
      setRenderedItems(
        renderItems({ items, itemComponent, handleClick }, layoutCache)
      );
    }
  }, [ // eslint-disable-line
    layoutCache,
  ]);

  useEffect(() => {
    if (renderedItems.length) {
      setVisibleItems(
        getVisibleItems(renderedItems, layoutCache, windowHeight, scrollTop)
      );
    }
  }, [ // eslint-disable-line
    renderedItems,
    scrollTop,
    windowHeight,
  ]);

  const { containerHeight } = layoutCache;

  return (
    <MasonryStyled
      className="VMG__Masonry"
      style={{ height: containerHeight }}
      ref={containerRef}
    >
      {visibleItems}
    </MasonryStyled>
  );
};

export default Masonry;
