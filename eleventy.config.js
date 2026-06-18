// Eleventy configuration.
// Source templates live in src/ and build to _site/ (plain static HTML).
// Day-to-day you don't run this by hand — `npm start` previews, `npm run build` builds.

module.exports = function (eleventyConfig) {
  // --- Static assets: copied to the output untouched, keeping the same URLs as today ---
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/.htaccess");
  eleventyConfig.addPassthroughCopy("src/save-email.php"); // PHP form handler (runs on the cPanel server)

  // The 404 page ships verbatim (no templating) so /404.html stays byte-identical.
  eleventyConfig.addPassthroughCopy("src/404.html");
  eleventyConfig.ignores.add("src/404.html");

  return {
    // The site is served from a subfolder during pre-launch (singledads.com/test/).
    // pathPrefix + the `| url` filter on links keeps every URL correct. At launch,
    // change this to "/" (one line) and everything points at the domain root.
    pathPrefix: "/test/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // Treat .html and .md files as Nunjucks templates so includes/loops work everywhere.
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
