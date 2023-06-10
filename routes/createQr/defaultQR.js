const express = require('express')
const createQR = require('../../controllers/qrImageGenerator')
const qrToArray = require('../../controllers/qrToArray')
const drawQRCode = require('../../qr/qrImageCreator')
const allowedOptions = require('../../controllers/allowedOptions')

const templates = require('../../qr/templates')

const router = express.Router()
const {getImageHttpPath} = require('../../utils')

const defaultQR = async (res, filteredOptions) => {
    try{
        const img = await templates.defaultQR(filteredOptions.data, filteredOptions)
        res.status(201).json(successResponse(201, {
            url: getImageHttpPath(img.split('/').at(-1))
        }))
    }
    catch(err){
        console.log(err)
        res.status(500).json(failResponse(500, ['Server is facing some issue.']))
    }
}

module.exports = defaultQR