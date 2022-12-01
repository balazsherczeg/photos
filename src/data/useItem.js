import useItems from './useItems';

const useItem = (id) => {
  const items = useItems();
  const i = items.find((item) => item.id === id);
  return i;
};

export default useItem;
