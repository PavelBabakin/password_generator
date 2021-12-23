const { createLogger, format, transports } = require('winston')

const logger = createLogger({
    transports: 
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        exitOnError: false
})

const handleError = (err, req, res) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    res.status(500).send('Something go wrong...')
}

module.exports = {
    logger,
    handleError
}