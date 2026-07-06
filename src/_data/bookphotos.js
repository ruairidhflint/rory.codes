const fs = require('fs')
const path = require('path')

// Reads the generated thumbnail directory so the gallery stays in sync with
// whatever images actually exist, rather than a hardcoded list.
module.exports = () => {
  const thumbsDir = path.join(__dirname, '../assets/books/thumbs')
  if (!fs.existsSync(thumbsDir)) return []

  return fs
    .readdirSync(thumbsDir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => {
      const base = file.replace(/\.[^.]+$/, '')
      return {
        thumb: `/assets/books/thumbs/${file}`,
        full: `/assets/books/large/${base}.jpg`,
      }
    })
}
