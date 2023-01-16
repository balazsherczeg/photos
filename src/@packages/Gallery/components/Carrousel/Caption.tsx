import React from 'react';
import Tags from 'components/Tags';
import { Item } from 'models/Item';
import styled from 'styled-components';

const Root = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: row-reverse;
  height: 3rem;
  justify-content: space-between;
  padding: 0 1rem;

  & .meta {
    display: flex;
    gap: 1rem;
  }
`;

const formatDate = (date: string) => {
  const dateParts = date.split('-');
  return dateParts.length === 3
    ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
    : date;
};

const Caption = ({
  item: {
    meta: { caption, date, location },
    tags = [],
  },
  className = null,
}: {
  item: Item;
  className?: string | null;
}) => {
  return (
    <Root className={`${className} VMG__Caption`}>
      <div className="meta">
        <Tags tags={tags} />
        {(date || location) && (
          <div>
            {formatDate(date)}
            {!!date && !!location && ', '}
            {location}
          </div>
        )}
      </div>
      {!!caption && (
        <h3 className="description VMG__Caption__description">{caption}</h3>
      )}
    </Root>
  );
};

export default Caption;
