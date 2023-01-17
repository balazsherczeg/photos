import React, { useRef, useMemo } from 'react';
import { ItemType } from 'models/Item';
import styled from 'styled-components';
import { getRatio } from '../../utils';
import { useWindowSize } from '../hooks';

const Root = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  & .contained {
    overflow: hidden;
  }
`;

const ImageSizer = ({
  children,
  item,
}: {
  children: React.ReactElement<any>;
  item: ItemType;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const imageRatio = getRatio(item);

  const containerSize = useMemo(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      return { width, height };
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, windowSize]);

  const containedSize = useMemo(() => {
    if (containerSize) {
      const { height: containerHeight, width: containerWidth } = containerSize;

      const containerRatio = containerWidth / containerHeight;

      if (imageRatio >= containerRatio) {
        return {
          height: containerWidth / imageRatio,
          width: containerWidth,
        };
      }

      if (imageRatio < containerRatio) {
        return {
          height: containerHeight,
          width: containerHeight * imageRatio,
        };
      }

      return {};
    }
  }, [imageRatio, containerSize]);

  return (
    <Root ref={containerRef}>
      <div className="contained" style={containedSize}>
        {React.cloneElement(children, { size: containedSize })}
      </div>
    </Root>
  );
};

export default ImageSizer;
