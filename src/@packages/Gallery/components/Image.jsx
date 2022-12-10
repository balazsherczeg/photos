import React, { useState, useEffect } from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import {
  getLargeEnoughSource,
  getLargestLoadedSource,
  itemPropType,
} from '../data';

const Wrapper = styled.div`
  background-color: #eee;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 1s;
  cursor: pointer;
  border: none;

  &[src] {
    opacity: 1;
  }
`;

const srcCache = {};

const ImageComponent = ({ item, size: { width, height } }) => {
  const [loadableSrc, setLoadableSrc] = useState(null);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [tempImage, setTempImage] = useState(null);

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
  }, [loadableSrc, loadedSrc]); // eslint-disable-line

  useEffect(() => {
    if (tempImage == null) {
      setTempImage(getLargestLoadedSource(item, srcCache));
    }
  }, [tempImage]); // eslint-disable-line

  return (
    <Wrapper
      className="VMG__Image__wrapper"
      style={{
        backgroundImage: tempImage ? `url(${tempImage})` : 'none',
        ...(item.meta.color ? { backgroundColor: item.meta.color } : {}),
      }}
      role="article"
    >
      <Img
        className="VMG__Image"
        {...(loadedSrc ? { src: loadedSrc } : {})}
        alt=""
        height={height}
        width={width}
      />
    </Wrapper>
  );
};

// ImageComponent.propTypes = {
//   item: itemPropType.isRequired,
//   size: {
//     width: number,
//     height: number,
//   }.isRequired,
// };

export default ImageComponent;
