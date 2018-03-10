const rupture = require("rupture");
const nib = require("nib");

module.exports = {
  siteMetadata: {
    title: 'Callisto Snapshot',
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
