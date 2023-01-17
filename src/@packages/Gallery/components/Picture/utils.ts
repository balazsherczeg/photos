import { ItemType } from 'models/Item';
import { SrcCacheType } from '@packages/Gallery/models/SrcCache';
import { getSizes, getLargestSource } from '@packages/Gallery/utils';

export const getLargeEnoughSource = (item: ItemType, minSize: number) => {
  const { sources } = item;
  const imageSizes = getSizes(item);
  const getLargerThanMin = (imageSize: number) => minSize <= imageSize;
  const largerSizes = imageSizes.filter(getLargerThanMin);

  if (!largerSizes.length) return getLargestSource(item);

  return sources[Math.min(...largerSizes)];
};

export const getLargestLoadedSource = (
  item: ItemType,
  srcCache: SrcCacheType
) => {
  const keys = Object.keys(item.sources);
  const isSourceCached = (key: string) => srcCache[item.sources[key].src];
  const alreadyLoadedKeys = keys
    .filter(isSourceCached)
    .map((number) => +number);

  if (!alreadyLoadedKeys.length) return false;

  const largestAlreadyLoaded = Math.max(...alreadyLoadedKeys);
  return item.sources[largestAlreadyLoaded].src;
};
