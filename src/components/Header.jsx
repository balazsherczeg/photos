import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation/Navigation';

const Root = styled.header`
  box-sizing: border-box;
  height: 64px;
  display: flex;
  padding: 8px 4px 8px 16px;
  justify-content: space-between;

  & .title {
    height: 32px;
    line-height: 48px;
    font-size: 24px;
    font-family: var(--sansSubsetForTitle);
    font-weight: 300;

    b {
      font-weight: 600;
    }
  }
`;

const Header = () => (
  <Root>
    <h1 className="title">
      <b>Balázs Herczeg</b> amateur photography
    </h1>
    <Navigation />
  </Root>
);

export default Header;
