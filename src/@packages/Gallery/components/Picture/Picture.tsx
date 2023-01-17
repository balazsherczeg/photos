import React, { useState, useEffect, useMemo } from 'react';
import { ItemType } from 'models/Item';
import styled from 'styled-components';
import { SizeType } from '@packages/Gallery/models/LayoutCache';
import { SrcCacheType } from '@packages/Gallery/models/SrcCache';
import { getLargeEnoughSource, getLargestLoadedSource } from './utils';

const Root = styled.div`
  background-color: #eee;
  background-size: cover;
  height: 100%;
  width: 100%;

  transition: background-color 1s;

  &.loaded {
    background-color: transparent !important;
  }

  & img {
    border: none;
    cursor: pointer;
    height: auto;
    opacity: 0;
    transition: opacity 1s;
    width: 100%;

    &[src] {
      opacity: 1;
    }
  }
`;

const srcCache = {} as SrcCacheType;

const Picture = ({ item, size }: { item: ItemType; size: SizeType }) => {
  const { width, height } = size ?? ({} as SizeType);
  const [loadableSrc, setLoadableSrc] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (width) {
      const { src } = getLargeEnoughSource(item, width);
      if (srcCache[src]) setLoadedSrc(src);
      setLoadableSrc(src);
    }
  }, [width, item]);

  useEffect(() => {
    if (loadableSrc && !loadedSrc) {
      const img = new Image();
      img.src = loadableSrc;
      img.onload = () => {
        setLoadedSrc(loadableSrc);
      };
      srcCache[loadableSrc] = true;
    }
  }, [loadableSrc, loadedSrc]);

  const tempImage = useMemo(
    () => getLargestLoadedSource(item, srcCache),
    [item]
  );

  const temporaryBackground = useMemo(
    () => ({
      backgroundImage: tempImage ? `url(${tempImage})` : 'none',
      ...(item.meta.color ? { backgroundColor: item.meta.color } : {}),
    }),
    [item.meta.color, tempImage]
  );

  return (
    <Root
      style={temporaryBackground}
      className={loadedSrc ? 'loaded' : ''}
      role="article"
    >
      <img
        {...(loadedSrc ? { src: loadedSrc } : {})}
        alt=""
        height={height}
        width={width}
      />
    </Root>
  );
};

export default Picture;
