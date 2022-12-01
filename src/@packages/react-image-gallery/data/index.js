export * from './propTypes';

const makeNumber = (numericString) => +numericString;

export const getSizes = (item) => {
  const {sources} = item;
  return Object.keys(sources).map(makeNumber);
};

export const getLargestSource = (item) => {
  const {sources} = item;
  const sizes = getSizes(item);
  return sources[Math.max(...sizes)];
};

// Public

export const getRatio = (item) => {
  const {width, height} = getLargestSource(item);
  return width / height;
};

export const getLargeEnoughSource = (item, minSize) => {
  const {sources} = item;
  const imageSizes = getSizes(item);
  const getLargerThanMin = (imageSize) => minSize <= imageSize;
  const largerSizes = imageSizes.filter(getLargerThanMin);

  if (!largerSizes.length) return getLargestSource(item);

  return sources[Math.min(...largerSizes)];
};

export const getLargestLoadedSource = (item, srcCache) => {
  const keys = Object.keys(item.sources);
  const isSourceCached = (key) => srcCache[item.sources[key].src];
  const alreadyLoadedKeys = keys.filter(isSourceCached).map(makeNumber);

  if (!alreadyLoadedKeys.length) return false;

  const largestAlreadyLoaded = Math.max(...alreadyLoadedKeys);
  return item.sources[largestAlreadyLoaded].src;
};
