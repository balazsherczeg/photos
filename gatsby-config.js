require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Balázs Herczeg amateur photography",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: { prefixes: [`/*`] },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Balázs Herczeg amateur photography`,
    //     short_name: `Arabic Art`,
    //     start_url: `/`,
    //     background_color: `#4D9BA3`,
    //     theme_color: `#4D9BA3`,
    //     display: `minimal-ui`,
    //     icon: `src/assets/favicon.png`,
    //   },
    // },
  ]
};
