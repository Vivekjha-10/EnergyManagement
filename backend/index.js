const config = require('./src/config/config')
global.gConfig = config

module.exports = require('./src/app')