import React, { useState, useEffect, useRef } from 'react';
import { useCallback } from 'react';
import useDimensions from 'react-cool-dimensions';
import { useMatch } from '@reach/router';
import { navigate } from 'gatsby';
import { Item } from 'models/Item';
import styled from 'styled-components';
import Carrousel from './components/Carrousel';
import ImageComponent from './components/Image';
import Layout from './components/Layout';
import Loading from './components/Loading';
import Masonry from './components/Masonry';
import useMasonry from './hooks/useMasonry';

const MasonryItem = styled.div`
  position: absolute;
`;

const Gallery = ({ items }: { items: Item[] }) => {
  const [fullView, setFullView] = useState<number | null>(null);
  const [showFullView, setShowFullView] = useState(false);
  const { paramItemId } = useMatch('/item/:paramItemId') ?? ({} as any);
  const { observe: containerRef, width: containerWidth } = useDimensions();
  const layoutCache = useMasonry(items, containerWidth);

  const parentLocation = useRef<string>('/');

  useEffect(() => {
    if (paramItemId) {
      setShowFullView(true);
    }
  }, [paramItemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [items]);

  useEffect(() => {
    if (items.length && paramItemId) {
      const index = items.findIndex((item) => item.id === paramItemId);
      setFullView(index !== -1 ? index : null);
    }
  }, [items, paramItemId]);

  const handleItemClick = useCallback(
    (index: number) => {
      parentLocation.current = window.location.pathname;
      navigate(`/item/${items[index]?.id}`);
      setFullView(index);
      setShowFullView(true);
    },
    [items]
  );

  const handleHideFullView = useCallback(
    async (index: number) => {
      await navigate(parentLocation.current);
      window.scrollTo(0, layoutCache.positions[index]?.top - 100);
      setShowFullView(false);
    },
    [layoutCache.positions]
  );

  const handleUnmountFullView = () => {
    setTimeout(() => setFullView(null), 1000);
  };

  const handleNext = useCallback(
    (index: number) => {
      navigate(`/item/${items[index]?.id}`);
    },
    [items]
  );

  const itemRendererFn = useCallback(
    (index: number) => {
      const position = layoutCache.positions[index];
      const item = items[index];

      return (
        <MasonryItem
          key={item.id}
          style={position}
          onClick={() => handleItemClick(index)}
          className="VMG__MasonryItem"
          role="button"
          id={item.id}
        >
          <ImageComponent item={item} size={layoutCache.positions[index]} />
        </MasonryItem>
      );
    },
    [handleItemClick, items, layoutCache.positions]
  );

  const modal =
    fullView != null ? (
      <Carrousel
        items={items}
        index={fullView}
        onClose={handleHideFullView}
        onNext={handleNext}
      />
    ) : null;

  return (
    <div className="VMG">
      {items ? (
        <Layout
          modal={modal}
          onUnmountModal={handleUnmountFullView}
          showModal={showFullView}
        >
          {items.length > 0 && (
            <div ref={containerRef}>
              <Masonry
                itemRendererFn={itemRendererFn}
                positions={layoutCache.positions}
                height={layoutCache.containerHeight}
              />
            </div>
          )}
        </Layout>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Gallery;
