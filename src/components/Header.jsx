import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

const Wrapper = styled.header`
  box-sizing: border-box;
  height: 64px;
  display: flex;
  padding: 8px 4px 8px 16px;
  justify-content: space-between;
`;

const Title = styled.h1`
  height: 32px;
  line-height: 48px;
  font-size: 24px;
  font-family: var(--sans);
  font-weight: 300;

  b {
    font-weight: 600;
  }
`;


const Header = () => (
  <Wrapper>
    <Title><b>Balázs Herczeg</b> amateur photography</Title>
    <Navigation />
  </Wrapper>
);

export default Header;