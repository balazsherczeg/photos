import useAllItems from './useAllItems';

const useItem = (id) => {
  const items = useAllItems();
  const i = items.find((item) => item.id === id);
  return i;
};

export default useItem;
