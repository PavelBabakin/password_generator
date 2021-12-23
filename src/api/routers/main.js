const express = require('express')
const router = express.Router()
const path = require('path')
const winston = require('../../utils/winstonLogger')
const passService = require('../../services/passService')

router.route('/')
    .get(async (req, res) => {
        
        res.status(200).sendFile('index.html', {root: path.join(__dirname, '../../views/')})
    })
    .post(async (req, res) => {
        try {
            const pass = await passService.createPass(req.body)
    
            res.status(201).json(pass)
        } catch (e) {
            winston.handleError(e, req, res)
        }
    })

module.exports = router