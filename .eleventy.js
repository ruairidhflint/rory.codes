const { DateTime } = require('luxon')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItCheckbox = require('markdown-it-checkbox')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPassthroughCopy('./src/css')
  eleventyConfig.addPassthroughCopy('./src/assets')

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  })

  eleventyConfig.addShortcode('year', () => {
    const year = new Date().getFullYear()
    return `${year}`
  })

  eleventyConfig.addCollection('portfolio', function (collection) {
    return collection
      .getFilteredByGlob('src/portfolio/*.md')
      .filter((x) => !x.data.hidden)
      .sort((a, b) => a.data.position - b.data.position)
  })

  let options = {
    html: true,
  }

  let md = markdownIt(options).use(markdownItCheckbox)
  md.render('[ ] unchecked')
  md.render('[x] checked')

  eleventyConfig.setLibrary('md', md)

  return {
    dir: {
      input: 'src',
      output: './_site',
    },
  }
}
