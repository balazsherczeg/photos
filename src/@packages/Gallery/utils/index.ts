import { ItemType, SourceType } from 'models/Item';

export const getSizes = (item: ItemType): number[] => {
  const { sources } = item;
  return Object.keys(sources).map((numericString) => +numericString);
};

export const getLargestSource = (item: ItemType): SourceType => {
  const { sources } = item;
  const sizes = getSizes(item);
  return sources[Math.max(...sizes)];
};

export const getRatio = (item: ItemType): number => {
  const { width, height } = getLargestSource(item);
  return width / height;
};
