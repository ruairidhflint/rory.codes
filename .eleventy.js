const { DateTime } = require('luxon')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItCheckbox = require('markdown-it-checkbox')
const sitemap = require('@quasibit/eleventy-plugin-sitemap')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: 'https://rory.codes',
    },
  })

  // eleventyConfig.addPassthroughCopy('./src/css') // Removed, PostCSS handles this
  eleventyConfig.addWatchTarget('./src/css/') // Watch for CSS changes
  eleventyConfig.addPassthroughCopy('./src/assets')
  // eleventyConfig.addPassthroughCopy({ 'src/robots.txt.njk': 'robots.txt' }) // Removed, permalink handles this

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

  eleventyConfig.setLibrary('md', md)

  return {
    dir: {
      input: 'src',
      output: './_site',
    },
  }
}
