import { useState, useEffect } from 'react';

const getLeft = () => document.body.getBoundingClientRect().left;

const getTop = () => document.body.getBoundingClientRect().top;

const useScroll = () => {
  const [scroll, setScroll] = useState<{
    x?: number;
    y?: number;
    direction?: string;
  }>({});

  useEffect(() => {
    setScroll({
      x: getLeft(),
      y: getTop(),
      direction: '',
    });
  }, []);

  const listener = () => {
    setScroll((prev) => ({
      x: getLeft(),
      y: -getTop(),
      direction:
        typeof prev.y === 'undefined' ? '' : prev.y > -getTop() ? 'up' : 'down',
    }));
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return scroll;
};

export default useScroll;
