const { DateTime } = require('luxon')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItCheckbox = require('markdown-it-checkbox')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const fs = require('fs')

module.exports = async function (eleventyConfig) {
  const sources = {}

  eleventyConfig.addShortcode('cite', function (url) {
    if (!sources[this.page.url]) {
      sources[this.page.url] = []
    }

    let index = sources[this.page.url].findIndex((item) => item.url === url)

    if (index === -1) {
      sources[this.page.url].push({ url })
      index = sources[this.page.url].length - 1
    }

    return `<sup class="citation"><a href="#citation-${
      index + 1
    }">[${index + 1}]</a></sup>`
  })

  eleventyConfig.addShortcode('render_sources', function () {
    if (!sources[this.page.url] || sources[this.page.url].length === 0) {
      return ''
    }

    const sourceList = sources[this.page.url]
      .map(
        (source, index) => `<li id="citation-${index + 1}">${source.url}</li>`
      )
      .join('')

    return `<hr>
<h3>Sources</h3>
<ol class="sources">${sourceList}</ol>`
  })

  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginRss)

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

  eleventyConfig.addFilter('isNew', (date) => {
    const now = new Date()
    const postDate = new Date(date)
    const daysDiff = Math.floor((now - postDate) / (1000 * 60 * 60 * 24))
    return daysDiff <= 30
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
