import React, {useState, useEffect} from 'react';
import {arrayOf} from 'prop-types';

import {itemPropType} from './data';
import Carrousel from './components/Carrousel';
import Loading from './components/Loading';
import ImageComponent from './components/Image';
import Masonry from './components/Masonry';
import Layout from './components/Layout';
import {useNavigate} from "@reach/router"
import { useCallback } from 'react';
import {useMatch} from '@reach/router';

const Gallery = ({
  items,
}) => {
  const navigate = useNavigate();
  const [fullView, setFullView] = useState(null);
  const [showFullView, setShowFullView] = useState(false);
  const {paramItemId} = useMatch('/item/:paramItemId') ?? {};
  const [parentLocation, setParentLocation] = useState('/');

  useEffect(() => {
    if (paramItemId) {
      setShowFullView(true);
    }
  }, []);

  useEffect(() => {
    if (items.length && paramItemId) {
      const index = items.findIndex(item => item.id === paramItemId);
      setFullView(index !== -1 ? index : null)  
    }
  }, [items]);

  const handleItemClick = useCallback((index) => {
    setParentLocation(window.location.pathname);
    navigate(`/item/${items[index]?.id}`);
    setFullView(index);
    setShowFullView(true);
  }, [items]);

  const handleHideFullView = () => {
    navigate(parentLocation);
    setShowFullView(false);
  };

  const handleUnmountFullView = () => {
    setTimeout(() => setFullView(null), 1000);
  };

  const handleNext = useCallback((index) => {
    navigate(`/item/${items[index]?.id}`);
  }, [items]);

  const modal = fullView != null
    ? (
      <Carrousel
        items={items}
        index={fullView}
        onClose={handleHideFullView}
        onNext={handleNext}
      />
    )
    : null;

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

Gallery.propTypes = {
  items: arrayOf(itemPropType),
};

Gallery.defaultProps = {
  items: null,
};

export default Gallery;
