const fs = require('fs')
const path = require('path')

module.exports = function () {
  // Embed the local artwork so OG images build without a network request.
  const asterisk = fs.readFileSync(
    path.join(__dirname, '../assets/asterisk-256.png')
  )

  return {
    asteriskDataUri: `data:image/png;base64,${asterisk.toString('base64')}`,
  }
}
