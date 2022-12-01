import useData from './useData';

const useItems = () => {
  const {items} = useData();

  return items || [];
};

export default useItems;
