import { useMemo } from 'react';
import { ItemType } from 'models/Item';
import { getRatio } from '@packages/Gallery/utils';
import { LayoutCache } from '../models/LayoutCache';

const MAX_COLUMN_WIDTH = 200;
const GUTTER = 16;
const LEFT = 0;

function getLayout(containerWidth: number) {
  const columnCount = Math.ceil(containerWidth / MAX_COLUMN_WIDTH);
  const columnWidth =
    (containerWidth - (columnCount - 1) * GUTTER - LEFT) / columnCount;
  return {
    columnCount,
    columnWidth,
  };
}

function getHighestBottom(bottoms: number[]) {
  return Math.min(...bottoms);
}

function getColumn(bottoms: number[], bottom: number) {
  return bottoms.indexOf(bottom);
}

function calculateLeft(column: number, columnWidth: number) {
  return column * columnWidth + column * GUTTER + LEFT;
}

function calculateNextBottom(bottom: number, height: number) {
  return bottom + height + GUTTER;
}

function calculateMasonry(items: ItemType[], containerWidth: number): LayoutCache {
  const { columnCount, columnWidth } = getLayout(containerWidth);
  const bottoms = Array.from({ length: columnCount }, () => 0);
  const layoutCache = { positions: [], containerHeight: 0 } as LayoutCache;

  let column = 1;
  let bottom;
  let ratio;
  let containerHeight = 0;
  let nextBottom;
  let height;

  for (let i = 0; i < items.length; i++) {
    ratio = getRatio(items[i]);
    bottom = getHighestBottom(bottoms);
    column = getColumn(bottoms, bottom);
    height = columnWidth / ratio;

    layoutCache.positions.push({
      left: calculateLeft(column, columnWidth),
      top: bottom,
      width: columnWidth,
      height,
    });

    nextBottom = calculateNextBottom(bottom, height);
    bottoms[column] = nextBottom;
    containerHeight = Math.max(containerHeight, nextBottom);
  }

  layoutCache.containerHeight = containerHeight;

  return layoutCache;
}

const useMasonry = (items: ItemType[], containerWidth: number) => {
  return useMemo(
    (): LayoutCache => calculateMasonry(items, containerWidth),
    [containerWidth, items]
  );
};

export default useMasonry;
