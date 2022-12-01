import {shape, number, string, objectOf, oneOfType} from 'prop-types';

export const itemPropType = shape({
  id: oneOfType([string, number]),
  sources: objectOf(shape({
    src: string,
    width: number,
    height: number,
  })),
  meta: shape({
    color: string,
    caption: string,
    date: string,
    location: string,
  }),
});
