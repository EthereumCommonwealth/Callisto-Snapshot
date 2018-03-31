const rupture = require("rupture");
const nib = require("nib");

module.exports = {
  pathPrefix: '/project-name',
  siteMetadata: {
    title: 'Callisto Network',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: "gatsby-plugin-stylus",
      options: {
        use: [nib(), rupture()],
      },
    },
  ],
};
