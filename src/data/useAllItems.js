import useData from './useData';

const useAllItems = () => {
  const { items } = useData();

  return items || [];
};

export default useAllItems;
