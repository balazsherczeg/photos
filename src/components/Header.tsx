import React, { useMemo } from 'react';
import useScroll from 'hooks/useScroll';
import styled from 'styled-components';
import Navigation from './Navigation/Navigation';

const MAX_ANIMATED_SCROLL = 200;

// https://easings.net/
const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const scrollToScale = (
  scrollPosition: number,
  startValue: number,
  endValue: number
) => {
  const scale =
    (MAX_ANIMATED_SCROLL - Math.min(scrollPosition, MAX_ANIMATED_SCROLL)) /
    MAX_ANIMATED_SCROLL;
  return endValue + easeInOutCubic(scale) * (startValue - endValue);
};

const Root = styled.header`
  align-items: center;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  padding: 0 0.25rem 0 1rem;
  position: fixed;
  width: 100%;
  z-index: 10;

  & .title {
    line-height: 2rem;
    font-size: 1.5rem;
    font-family: var(--sansSubsetForTitle);
    font-weight: 300;

    b {
      font-weight: 600;
    }

    transform-origin: 0 50% 0;
  }
`;

const Header = () => {
  const { y = 0 } = useScroll();
  const scrollPosition = Math.min(MAX_ANIMATED_SCROLL, y);

  const styles = useMemo(
    () => ({
      root: {
        transform: `translate3d(0, ${scrollToScale(
          scrollPosition,
          0,
          -2
        )}rem, 0)`,
      },
      title: {
        transform: `scale3d(
          ${scrollToScale(scrollPosition, 1, 0.75)}, 
          ${scrollToScale(scrollPosition, 1, 0.75)},
          1
        ) translate3d(0, ${scrollToScale(scrollPosition, 0, 1.25)}rem, 0)`,
      },
      navigation: {
        transform: `translate3d(0, ${scrollToScale(
          scrollPosition,
          0,
          1
        )}rem, 0)`,
      },
    }),
    [scrollPosition]
  );

  return (
    <Root style={styles.root}>
      <h1 className="title" style={styles.title}>
        <b>Balázs Herczeg</b> amateur photography
      </h1>
      <div style={styles.navigation}>
        <Navigation />
      </div>
    </Root>
  );
};

export default Header;
