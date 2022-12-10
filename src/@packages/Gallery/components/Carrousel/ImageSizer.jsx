import React, { useRef, useEffect, useState } from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import { getRatio, itemPropType } from '../../data';
import { useWindowSize } from '../hooks';

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const Contained = styled.div`
  overflow: hidden;
`;

const ImageSizer = ({ item, children }) => {
  const containerRef = useRef(null);
  const windowSize = useWindowSize();

  const [containerSize, setContainerSize] = useState(null);
  const [containedSize, setContainedSize] = useState({});

  const imageRatio = getRatio(item);

  useEffect(() => {
    if (containerRef != null) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, [containerRef, windowSize]);

  useEffect(() => {
    if (containerSize) {
      const { height: containerHeight, width: containerWidth } = containerSize;

      const containerRatio = containerWidth / containerHeight;

      if (imageRatio >= containerRatio) {
        setContainedSize({
          height: containerWidth / imageRatio,
          width: containerWidth,
        });
      }

      if (imageRatio < containerRatio) {
        setContainedSize({
          height: containerHeight,
          width: containerHeight * imageRatio,
        });
      }
    }
  }, [imageRatio, containerSize]);

  return (
    <Container ref={containerRef}>
      <Contained style={containedSize}>
        {React.cloneElement(children, { size: containedSize })}
      </Contained>
    </Container>
  );
};

ImageSizer.propTypes = {
  children: node.isRequired,
  item: itemPropType.isRequired,
};

export default ImageSizer;
