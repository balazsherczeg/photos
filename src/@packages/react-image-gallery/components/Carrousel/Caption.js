import React from 'react';
import {string} from 'prop-types';
import styled from 'styled-components';

import {itemPropType} from '../../data';

const Wrapper = styled.div`
  background-color: #fff;
  font-family: sans-serif;
  height: 48px;
  line-height: 48px;
  padding: 0 16px;
`;

const Meta = styled.div`
  float: right;
`;

const Description = styled.p`
  float: left;
  margin: 0;
`;

const formatDate = (date) => date;

const Caption = ({
  item: {
    meta: {
      caption,
      date,
      location,
    },
  },
  className,
}) => {
  if (caption || date || location) {
    return (
      <Wrapper className={`${className} VMG__Caption`}>
        {(date || location) && (
          <Meta className="VMG__Caption__meta">
            {formatDate(date)}
            {date && location && ', '}
            {location}
          </Meta>
        )}
        <Description className="VMG__Caption__description">
          {caption}
        </Description>
      </Wrapper>
    );
  }
  return null;
};

Caption.propTypes = {
  item: itemPropType.isRequired,
  className: string,
};

Caption.defaultProps = {
  className: null,
};

export default Caption;
