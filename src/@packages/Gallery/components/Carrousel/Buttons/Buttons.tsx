import React from 'react';
import styled from 'styled-components';
import BaseButton from './BaseButton';

const svgClose = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#666" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" /></svg>'
);

const CloseButton = styled(BaseButton)`
  background-image: url('data:image/svg+xml;utf8,${svgClose}');
  top: 0.5rem;
  left: 0.5rem;
`;

const svgNext = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#666" d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z" /></svg>'
);

const NextButton = styled(BaseButton)`
  background-image: url('data:image/svg+xml;utf8,${svgNext}');
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  right: 0;
  top: 50%;

  @media (pointer: coarse) {
    background-position: 0.75rem center;
    margin-top: -1.5rem;
    width: 3.5rem;
  }

  @media (pointer: fine) {
    background-position: 0.25rem center;
    margin-top: -1rem;
    width: 2.5rem;
  }
`;

const svgPrev = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path  fill="#666" d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>'
);

const PrevButton = styled(BaseButton)`
  background-image: url('data:image/svg+xml;utf8,${svgPrev}');
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  left: 0;
  top: 50%;

  @media (pointer: coarse) {
    background-position: 1.25rem center;
    margin-top: -1.5rem;
    width: 3.5rem;
  }

  @media (pointer: fine) {
    background-position: 0.75rem center;
    margin-top: -1rem;
    width: 2.5rem;
  }
`;

const Buttons = ({
  onClose,
  onNext,
  onPrev,
  showNext,
  showPrev,
}: {
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  showNext: boolean;
  showPrev: boolean;
}) => (
  <>
    <CloseButton onClick={onClose} />
    {showPrev && <PrevButton onClick={onPrev} />}
    {showNext && <NextButton onClick={onNext} />}
  </>
);

export default Buttons;
