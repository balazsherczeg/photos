import React, { useMemo } from 'react';
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

  const layoutCache = useMemo(
    (): LayoutCache => calculateMasonry({ items, containerWidth }),
    [containerWidth, items]
  );

  const renderedItems = useMemo(
    () =>
      layoutCache.positions
        ? renderItems({ items, itemComponent, handleClick }, layoutCache)
        : [],
    [layoutCache]
  );

  const visibleItems = useMemo(
    () =>
      renderedItems.length
        ? getVisibleItems(renderedItems, layoutCache, windowHeight, scrollTop)
        : [],
    [renderedItems, scrollTop, windowHeight]
  );

  const style = useMemo(
    () => ({ height: layoutCache.containerHeight }),
    [layoutCache.containerHeight]
  );

  return (
    <MasonryStyled className="VMG__Masonry" style={style} ref={containerRef}>
      {visibleItems}
    </MasonryStyled>
  );
};

export default Masonry;
