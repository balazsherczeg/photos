import React, {useState} from 'react';
import {arrayOf} from 'prop-types';

import {itemPropType} from './data';
import Carrousel from './components/Carrousel';
import Loading from './components/Loading';
import ImageComponent from './components/Image';
import Masonry from './components/Masonry';
import Layout from './components/Layout';

const Gallery = ({
  items,
}) => {
  const [fullView, setFullView] = useState(null);
  const [showFullView, setShowFullView] = useState(false);

  const handleItemClick = (index) => {
    setFullView(index);
    setShowFullView(true);
  };

  const handleHideFullView = () => {
    setShowFullView(false);
  };

  const handleUnmountFullView = () => {
    setTimeout(() => setFullView(null), 1000);
  };

  const modal = fullView != null
    ? (
      <Carrousel
        items={items}
        index={fullView}
        onClose={handleHideFullView}
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
