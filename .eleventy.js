const { DateTime } = require('luxon')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItCheckbox = require('markdown-it-checkbox')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPassthroughCopy('./src/css')
  eleventyConfig.addPassthroughCopy('./src/assets')

  // Add collection for notes using the directory structure
  eleventyConfig.addCollection('notes', function (collectionApi) {
    // Get all markdown files in the notes directory
    const notesCollection = collectionApi.getFilteredByGlob('src/notes/*.md')
    console.log(`Found ${notesCollection.length} notes via glob pattern`)

    return notesCollection.sort((a, b) => {
      return new Date(b.date) - new Date(a.date) // Sort by date in descending order
    })
  })

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  })

  eleventyConfig.addShortcode('year', () => {
    const year = new Date().getFullYear()
    return `${year}`
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
