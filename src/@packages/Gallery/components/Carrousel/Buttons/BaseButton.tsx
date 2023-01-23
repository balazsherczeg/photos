import styled from 'styled-components';

const BaseButton = styled.button`
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
  height: 3rem;
  opacity: 0.5;
  outline: none;
  padding: 0;
  position: absolute;
  -webkit-tap-highlight-color: transparent;
  width: 3rem;
  z-index: 100;

  &:active {
    opacity: 1;
  }
`;

export default BaseButton;
