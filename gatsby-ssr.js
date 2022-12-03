import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
       rel="preload"
       href={`${process.env.GATSBY_DATA_URL}data.json`}
       as="fetch"
       type="application/json"
       crossOrigin="anonymous"
    />,
    <link
      rel="preload"
      href="/fonts/SourceSans3-VariableFont_wght-title.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="sourceSansTitle"
    />,
  ]);
};
