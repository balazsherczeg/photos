import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useMatch } from '@reach/router';
import { navigate } from 'gatsby';
import { Item } from 'models/Item';
import Carrousel from './components/Carrousel';
import ImageComponent from './components/Image';
import Layout from './components/Layout';
import Loading from './components/Loading';
import Masonry from './components/Masonry';

const Gallery = ({ items }: { items: Item[] }) => {
  const [fullView, setFullView] = useState<number | null>(null);
  const [showFullView, setShowFullView] = useState(false);
  const { paramItemId } = useMatch('/item/:paramItemId') ?? ({} as any);
  const [parentLocation, setParentLocation] = useState('/');

  useEffect(() => {
    if (paramItemId) {
      setShowFullView(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [items]);

  useEffect(() => {
    if (items.length && paramItemId) {
      const index = items.findIndex((item) => item.id === paramItemId);
      setFullView(index !== -1 ? index : null);
    }
  }, [items]);

  const handleItemClick = (index: number) => {
    setParentLocation(window.location.pathname);
    navigate(`/item/${items[index]?.id}`);
    setFullView(index);
    setShowFullView(true);
  };

  const handleHideFullView = async (index: number) => {
    await navigate(parentLocation);
    const activeElement = document.getElementById(items[index]?.id);
    console.log(items[index]?.id);
    console.log(activeElement);
    console.log(activeElement?.style.top);
    activeElement?.scrollIntoView();
    setShowFullView(false);
  };

  const handleUnmountFullView = () => {
    setTimeout(() => setFullView(null), 1000);
  };

  const handleNext = useCallback(
    (index: number) => {
      navigate(`/item/${items[index]?.id}`);
    },
    [items]
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
            <Masonry
              handleClick={handleItemClick}
              items={items}
              itemComponent={ImageComponent}
            />
          )}
        </Layout>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Gallery;
