import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Position } from '@packages/Gallery/models/LayoutCache';
import useVisibleItems from './useVisibleItems';

const Root = styled.div`
  position: relative;
`;

const Masonry = ({
  positions,
  height,
  itemRendererFn,
}: {
  positions: Position[];
  height: number;
  itemRendererFn: (index: number) => any;
}) => {
  const renderedItems = useMemo(
    () => positions.map((_, index) => itemRendererFn(index)),
    [itemRendererFn, positions]
  );

  const visibleItems = useVisibleItems(renderedItems, positions);

  const style = useMemo(() => ({ height }), [height]);

  return (
    <Root className="VMG__Masonry" style={style}>
      {visibleItems}
    </Root>
  );
};

export default Masonry;
