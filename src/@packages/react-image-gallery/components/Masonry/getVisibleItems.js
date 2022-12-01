const getVisibleItems = (items, layoutCache, windowHeight, scrollTop) => {
  const visibleItems = [];

  layoutCache.positions.forEach((position, key) => {
    if (
      position.top + position.height > scrollTop - 200
      && position.top < scrollTop + windowHeight + 200
    ) {
      visibleItems.push(items[key]);
    }
  });

  return visibleItems;
};

export default getVisibleItems;
