import { useMemo } from 'react';
import { PositionType } from '@packages/Gallery/models/LayoutCache';
import { useWindowSize, useScroll } from '../hooks';

const getVisibleItems = (
  renderedItems: JSX.Element[],
  positions: PositionType[],
  windowHeight: number,
  scrollTop: number
): JSX.Element[] => {
  const visibleItems = [] as JSX.Element[];

  positions.forEach((position, key) => {
    if (
      position.top + position.height > scrollTop - 200 &&
      position.top < scrollTop + windowHeight + 200
    ) {
      visibleItems.push(renderedItems[key]);
    }
  });

  return visibleItems;
};

const useVisibleItems = (
  renderedItems: JSX.Element[],
  positions: PositionType[]
): JSX.Element[] => {
  const { height: windowHeight = 0 } = useWindowSize();
  const { y: scrollTop } = useScroll();

  return useMemo(
    () =>
      renderedItems.length
        ? getVisibleItems(renderedItems, positions, windowHeight, scrollTop)
        : [],
    [positions, renderedItems, scrollTop, windowHeight]
  );
};

export default useVisibleItems;
