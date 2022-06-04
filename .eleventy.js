const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/assets');

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addShortcode('year', () => {
    const year = new Date().getFullYear();
    return `${year}`;
  });

  eleventyConfig.addCollection('portfolio', function (collection) {
    return collection.getFilteredByGlob('src/portfolio/*.md').sort((a, b) => a.data.position - b.data.position);
  });

  return {
    dir: {
      input: 'src',
      output: './_site',
    },
  };
};
