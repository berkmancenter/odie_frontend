'use strict'

const packageJson = require('../package.json')

let date = new Date()
let dateString =
    date.getFullYear() + "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) + "/" +
    ("0" + date.getDate()).slice(-2) + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2)

module.exports = {
  NODE_ENV: '"production"',
  BUILD_DATE: JSON.stringify(dateString),
  BUILD_VERSION: JSON.stringify(packageJson.version)
}
