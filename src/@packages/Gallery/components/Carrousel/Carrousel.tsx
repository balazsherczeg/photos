import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ItemType } from 'models/Item';
import styled from 'styled-components';
import Buttons from './Buttons';
import Item from './Item';

const Root = styled.div`
  background: #fff;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100vw;

  & .movingPart {
    height: 100%;
    position: absolute;
    transition: transform 0.5s;
  }
`;

const Carrousel = ({
  index: startIndex,
  onClose,
  onNext,
  items,
}: {
  index: number;
  onClose: (index: number) => void;
  onNext: (nextIndex: number) => void;
  items: ItemType[];
}) => {
  const [index, setIndex] = useState(startIndex);
  const [renderables, setRenderables] = useState([startIndex]);

  const firstFrame = index === 0;
  const lastFrame = index === items.length - 1;

  const carrouselStyle = useMemo(
    () => ({
      width: `${items.length * 100}vw`,
      transform: `translate3d(-${index * 100}vw, 0, 0)`,
    }),
    [index, items.length]
  );

  const handleClick = useCallback(
    (nextIndex: number) => {
      onNext(nextIndex);
      setIndex(nextIndex);
      const nextRenderables = [...renderables];
      nextRenderables.push(nextIndex);
      if (nextRenderables.length > 2) nextRenderables.shift();
      setRenderables(nextRenderables);
    },
    [onNext, renderables]
  );

  const handleNextClick = useCallback(() => {
    handleClick(index + 1);
  }, [handleClick, index]);

  const handlePrevClick = useCallback(() => {
    handleClick(index - 1);
  }, [handleClick, index]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 27: // Escape
          onClose(index);
          break;
        case 39: // Right arrow
          if (!lastFrame) handleNextClick();
          break;
        case 37: // Left arrow
          if (!firstFrame) handlePrevClick();
          break;
        // No default
      }
    },
    [firstFrame, handleNextClick, handlePrevClick, index, lastFrame, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextClick,
    onSwipedRight: handlePrevClick,
    trackMouse: true,
  });

  return (
    <Root {...swipeHandlers}>
      <Buttons
        onPrev={handlePrevClick}
        onNext={handleNextClick}
        onClose={() => onClose(index)}
        showPrev={!firstFrame}
        showNext={!lastFrame}
      />
      <div className="movingPart" style={carrouselStyle}>
        {renderables.map((renderableIndex) => (
          <Item
            item={items[renderableIndex]}
            index={renderableIndex}
            key={renderableIndex}
          />
        ))}
      </div>
    </Root>
  );
};

export default Carrousel;
