import React, { useState } from 'react';
import styled from 'styled-components';
import SlideIn from '@packages/SlideIn';
import Categories from './Categories';
import Tags from './Tags';

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
  position: absolute;
  top: 0;
  bottom: 0;
  width: 300px;
  right: 0;
  background: #fff;
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
          <Categories />
          <Tags />
        </SidebarRoot>
      </SlideIn>
    </div>
  );
};

export default Navigation;
