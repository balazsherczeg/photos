import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { bool, func, node, number } from 'prop-types';

const SlideIn = ({ children, on, duration }) => {
  const cssTransitionProps = {
    in: on,
    unmountOnExit: true,
    timeout: duration,
  };

  return (
    <CSSTransition {...cssTransitionProps} classNames="modal-transition">
      {children}
    </CSSTransition>
  );
};

SlideIn.propTypes = {
  children: node.isRequired,
  on: bool.isRequired,
  onClose: func.isRequired,
  duration: number,
};

SlideIn.defaultProps = {
  duration: 500,
};

export default SlideIn;
