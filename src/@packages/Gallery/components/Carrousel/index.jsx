import React, { useState, useEffect } from 'react';
import { arrayOf, func, number, object } from 'prop-types';
import styled from 'styled-components';
import Buttons from './Buttons';
import Item from './Item';

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  position: relative;
`;

const Main = styled.div`
  position: absolute;
  height: 100vh;
  transition: transform 0.5s;
`;

const Carrousel = ({ index: startIndex, onClose, onNext, items }) => {
  const [index, setIndex] = useState(startIndex);
  const [renderables, setRenderables] = useState([startIndex]);

  const getCarrouselStyle = () => ({
    width: `${items.length * 100}vw`,
    transform: `translate3d(-${index * 100}vw, 0, 0)`,
  });

  const handleClick = (nextIndex) => {
    onNext(nextIndex);
    setIndex(nextIndex);
    const nextRenderables = [...renderables];
    nextRenderables.push(nextIndex);
    if (nextRenderables.length > 2) nextRenderables.shift();
    setRenderables(nextRenderables);
  };

  const handleNextClick = () => {
    handleClick(index + 1);
  };

  const handlePrevClick = () => {
    handleClick(index - 1);
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 27: // Escape
        onClose();
        break;
      case 39: // Right arrow
        if (!lastFrame) handleNextClick();
        break;
      case 37: // Left arrow
        if (!firstFrame) handlePrevClick();
        break;
      // No default
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const firstFrame = index === 0;
  const lastFrame = index === items.length - 1;

  return (
    <Wrapper className="VMG__Carrousel__wrapper">
      <Buttons
        onPrev={handlePrevClick}
        onNext={handleNextClick}
        onClose={onClose}
        showPrev={!firstFrame}
        showNext={!lastFrame}
      />
      <Main className="VMG__Carrousel" style={getCarrouselStyle()}>
        {renderables.map((renderableIndex) => (
          <Item
            item={items[renderableIndex]}
            index={renderableIndex}
            key={renderableIndex}
          />
        ))}
      </Main>
    </Wrapper>
  );
};

Carrousel.propTypes = {
  items: arrayOf(object),
  index: number.isRequired,
  onClose: func.isRequired,
};

Carrousel.defaultProps = {
  items: [],
};

export default Carrousel;
