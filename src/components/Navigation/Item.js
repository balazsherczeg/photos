import React from 'react';
import { Link } from '@reach/router';
import { bool, string } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  --color: var(--categoryColor-${({ category }) => category});

  position: relative;
  transition: all 0.3s ease;
  transition-property: background-color, fill;

  a {
    display: block;
    fill: var(--color);
    line-height: 3rem;
    height: 3rem;
    padding: 0 1rem 0 3rem;
    text-decoration: none;
  }

  a:hover {
    background-color: #eee;
  }
`;

const Inner = styled.span`
  color: #000;
  font-family: ${({ active }) =>
    active ? 'var(--sansItalic)' : 'var(--sans)'};
  letter-spacing: 0.02em;
  opacity: 0.8;
`;

const Item = ({ active, children, to, slug, href }) => {
  return (
    <Wrapper active={active} category={slug}>
      {href ? (
        <a href={href}>
          <Inner>{children}</Inner>
        </a>
      ) : (
        <Link to={to}>
          <Inner active={active}>{children}</Inner>
        </Link>
      )}
    </Wrapper>
  );
};

Item.propTypes = {
  active: bool.isRequired,
  children: string.isRequired,
  to: string.isRequired,
  slug: string,
  href: string,
};

Item.defaultProps = {
  slug: null,
  href: false,
};

export default Item;
