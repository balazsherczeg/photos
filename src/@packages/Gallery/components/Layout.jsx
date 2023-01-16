import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { bool, node, func } from 'prop-types';
import styled from 'styled-components';
import Portal from '@packages/Portal';

const Modal = styled.div`
  background-color: white;
  bottom: 0;
  height: 100vh;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transform: translate3d(0, 100vh, 0);
  transition: 0.3s;
  width: 100vw;

  &.VMG__Modal--enter {
    transform: translate3d(0, 100vh, 0);
  }
  &.VMG__Modal--enter-done {
    transform: translate3d(0, 0, 0);
  }
  &.VMG__Modal--exit {
    transform: translate3d(0, 0, 0);
  }
  &.VMG__Modal--exit-done {
    transform: translate3d(0, 100vh, 0);
  }
`;

const Layout = ({ children, modal, onUnmountModal, showModal }) => (
  <>
    {children}

    <CSSTransition
      in={showModal}
      timeout={0}
      classNames="VMG__Modal-"
      onExited={onUnmountModal}
    >
      <Portal>
        <Modal className="VMG__Modal">{modal}</Modal>
      </Portal>
    </CSSTransition>
  </>
);

Layout.propTypes = {
  children: node.isRequired,
  modal: node,
  onUnmountModal: func.isRequired,
  showModal: bool.isRequired,
};

Layout.defaultProps = {
  modal: null,
};

export default Layout;
