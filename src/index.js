const cors = require('cors')
const express = require('express')
const morgan = require('./utils/morganLogger')
const winston = require('./utils/winstonLogger')
const process = require('process')
const path = require('path')
const mainRouter = require('./api/routers/main')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use(morgan(':method :url :status :body - :response-time ms'))

app.use('/assets', express.static(path.join(__dirname, 'public')))

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection', p)
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception')
    })

app.use('/', mainRouter)

app.use((req,res,next) => {
    winston.logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    return res.status(404).send("PAGE NOT FOUND")
})

app.use((err,req,res,next) => {
    winston.logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    return res.status(500).send('Internal Server Error!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})