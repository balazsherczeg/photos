import { Tags as TagsType } from 'models/Tags';
import useData from './useData';

const Tags = (): TagsType => {
  const { tags } = useData();

  return tags ?? {};
};

export default Tags;
