import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({
  children,
  zIndex = 100,
  position = 'absolute',
}: React.PropsWithChildren<{
  zIndex?: number;
  position?: 'absolute' | 'relative';
}>) => {
  const [container, setContainer] = useState<any>(null);

  useEffect(() => setContainer(document.createElement('div')), []);

  useEffect(() => {
    if (container) {
      container.style.position = position;
      container.style.zIndex = zIndex;
      document.body.appendChild(container);
    }
    return () => {
      if (container) document.body.removeChild(container);
    };
  }, [container, position, zIndex]);

  return container ? ReactDOM.createPortal(children, container) : null;
};

export default Portal;
