import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Portal from '@packages/Portal';

const DURATION = 500;

const Root = styled.div<{
  duration: number;
  transparentScrim: boolean;
  width: number;
}>`
  & .scrim {
    background: ${({ transparentScrim }) =>
      transparentScrim ? 'transparent' : '#0003'};
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;

    &.scrim-transition-enter {
      opacity: 0;
    }
    &.scrim-transition-enter-active {
      opacity: 1;
      transition: opacity ${({ duration }) => duration}ms;
    }
    &.scrim-transition-exit {
      opacity: 1;
    }
    &.scrim-transition-exit-active {
      opacity: 0;
      transition: ${DURATION}ms;
    }
  }

  & .slidable {
    bottom: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: ${({ width }) => width}px;
    z-index: 2;

    &.slidable-transition-enter {
      transform: translate3d(100%, 0, 0);
    }
    &.slidable-transition-enter-active {
      transform: translate3d(0%, 0, 0);
      transition: transform ${({ duration }) => duration}ms;
    }
    &.slidable-transition-exit {
      transform: translate3d(0, 0, 0);
    }
    &.slidable-transition-exit-active {
      transform: translate3d(100%, 0, 0);
      transition: transform ${({ duration }) => duration}ms;
    }
  }
`;

const cssTransitionProps = {
  unmountOnExit: true,
  timeout: DURATION,
};

type Props = React.PropsWithChildren<{
  duration?: number;
  on: boolean;
  onClose: () => void;
  scrim?: boolean;
  transparentScrim?: boolean;
  width: number;
}>;

const SlideIn = ({
  children,
  duration = DURATION,
  on,
  onClose,
  scrim = true,
  transparentScrim = false,
  width,
}: Props) => {
  return (
    <Portal>
      <Root
        duration={duration}
        transparentScrim={transparentScrim}
        width={width}
      >
        {scrim && (
          <CSSTransition
            {...cssTransitionProps}
            classNames="scrim-transition"
            in={on}
          >
            <div className="scrim" onClick={onClose} />
          </CSSTransition>
        )}

        <CSSTransition
          {...cssTransitionProps}
          classNames="slidable-transition"
          in={on}
        >
          <div className="slidable">{children}</div>
        </CSSTransition>
      </Root>
    </Portal>
  );
};

export default SlideIn;
