import React, { useState } from 'react';
import styled from 'styled-components';
import SlideIn from '@packages/SlideIn';
import Categories from './components/Categories';
import Tags from './components/Tags';

const Button = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
`;

const SidebarRoot = styled.nav`
  background: #fff;
  bottom: 0;
  padding-top: 1.5rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;

  & > div:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: var(--font-size-smaller-1);
    letter-spacing: 0.05rem;
    margin-bottom: 0.5rem;
    padding-left: 2rem;
    text-transform: uppercase;
  }
`;

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleClose = () => {
    setShowMenu(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </Button>

      <SlideIn on={showMenu} onClose={handleClose} width={300}>
        <SidebarRoot>
          <h3>Categories</h3>
          <Categories />

          <h3>Tags</h3>
          <Tags />
        </SidebarRoot>
      </SlideIn>
    </div>
  );
};

export default Navigation;
