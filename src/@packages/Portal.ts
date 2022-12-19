import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({
  children,
  zIndex = 100,
  position = 'absolute',
}: React.PropsWithChildren<{
  zIndex: number;
  position: 'absolute' | 'relative';
}>) => {
  const [container, setContainer] = useState<any>(null);

  useEffect(() => setContainer(document.createElement('div')), []);

  useEffect(() => {
    if (container) {
      container.style = {
        ...(container.style ?? {}),
        position,
        zIndex,
      };
      document.body.appendChild(container);
    }
    return () => {
      if (container) document.body.removeChild(container);
    };
  }, [container, position, zIndex]);

  if (container) return ReactDOM.createPortal(children, container);
};

export default Portal;
