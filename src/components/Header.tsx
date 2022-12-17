import React from 'react';
import classcat from 'classcat';
import useScroll from 'hooks/useScroll';
import styled from 'styled-components';
import Navigation from './Navigation/Navigation';

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

  transition: 0.5s;

  & .title {
    line-height: 2rem;
    font-size: 24px;
    font-family: var(--sansSubsetForTitle);
    font-weight: 300;

    b {
      font-weight: 600;
    }

    transition: 0.5s;
    transform: scale3d(1, 1, 1);
    transform-origin: 0 50% 0;
  }

  &.minimal {
    height: 2rem;

    .title {
      transform: scale3d(0.8, 0.8, 1);
    }
  }
`;

const Header = () => {
  const { y } = useScroll();

  console.log(y);

  return (
    <Root className={classcat({ minimal: y > 20 })}>
      <h1 className="title">
        <b>Balázs Herczeg</b> amateur photography
      </h1>
      <Navigation />
    </Root>
  );
};

export default Header;
