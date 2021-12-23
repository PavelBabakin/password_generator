const morgan = require('morgan')

morgan.token('body', (req, res) => JSON.stringify(req.body))

module.exports = morgan