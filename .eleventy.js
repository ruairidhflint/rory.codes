const { DateTime } = require('luxon')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItCheckbox = require('markdown-it-checkbox')
const sitemap = require('@quasibit/eleventy-plugin-sitemap')
const fs = require('fs')
module.exports = async function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: 'https://rory.codes',
    },
  })

  const EleventyPluginOgImage = (await import('eleventy-plugin-og-image'))
    .default
  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    satoriOptions: {
      fonts: [
        {
          name: 'Helvetica',
          data: fs.readFileSync('./src/assets/fonts/Helvetica.ttf'),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  })

  eleventyConfig.addWatchTarget('./src/css/')
  eleventyConfig.addPassthroughCopy('./src/assets')

  eleventyConfig.addCollection('notes', function (collectionApi) {
    const notesCollection = collectionApi.getFilteredByGlob('src/notes/*.md')
    console.log(`Found ${notesCollection.length} notes via glob pattern`)

    return notesCollection.sort((a, b) => {
      return new Date(b.date) - new Date(a.date) // Sort by date in descending order
    })
  })

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  })

  eleventyConfig.addFilter('visible', (collection) => {
    return collection.filter((item) => item.visible === true)
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
