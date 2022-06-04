module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/css');
  return {
    dir: {
      input: 'src', // Equivalent to Jekyll's source property
      output: './_site', // Equivalent to Jekyll's destination property
    },
  };
};
