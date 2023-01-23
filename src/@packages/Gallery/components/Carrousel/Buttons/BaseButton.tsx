import styled from 'styled-components';

const BaseButton = styled.button`
  background-color: #ddd;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  outline: none;
  padding: 0;
  position: absolute;
  -webkit-tap-highlight-color: transparent;
  z-index: 100;

  @media (pointer: coarse) {
    border-radius: 1.5rem;
    height: 3rem;
    width: 3rem;
  }

  @media (pointer: fine) {
    border-radius: 1rem;
    height: 2rem;
    width: 2rem;
  }

  &:active {
    opacity: 1;
  }
`;

export default BaseButton;
