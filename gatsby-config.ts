import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';
import path from 'path';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Photos',
    siteUrl: 'https://photos.herczeg.ee',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        assets: path.join(__dirname, 'src', 'assets'),
        data: path.join(__dirname, 'src', 'data'),
        hooks: path.join(__dirname, 'src', 'hooks'),
        models: path.join(__dirname, 'src', 'models'),
        '@packages': path.join(__dirname, 'src', '@packages'),
        utils: path.join(__dirname, 'src', 'utils'),
      },
    },
  ],
};

export default config;
