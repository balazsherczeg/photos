import {getRatio} from '../../data';

const MAX_COLUMN_WIDTH = 200;
const GUTTER = 16;
const LEFT = 0;

function getLayout(containerWidth) {
  const columnCount = Math.ceil(containerWidth / MAX_COLUMN_WIDTH);
  const columnWidth = (containerWidth - ((columnCount - 1) * GUTTER) - LEFT) / columnCount;
  return {
    columnCount,
    columnWidth,
  };
}

function getHighestBottom(bottoms) {
  return Math.min(...bottoms);
}

function getColumn(bottoms, bottom) {
  return bottoms.indexOf(bottom);
}

function calculateLeft(column, columnWidth) {
  return column * columnWidth + (column * GUTTER) + LEFT;
}

function calculateNextBottom(bottom, height) {
  return bottom + height + GUTTER;
}

export default function calculateMasonry({items, containerWidth}) {
  const {
    columnCount,
    columnWidth,
  } = getLayout(containerWidth);
  const bottoms = Array.from({length: columnCount}, () => 0);
  const layoutCache = {positions: [], containerHeight: 0};

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
