const express = require('express')
const createQR = require('../../controllers/qrImageGenerator')
const qrToArray = require('../../controllers/qrToArray')
const drawQRCode = require('../../qr/qrImageCreator')
const allowedOptions = require('../../controllers/allowedOptions')

const fs = require('fs')
const sharp = require('sharp')

const templates = require('../../qr/templates')

const router = express.Router()
const {getImageHttpPath, deleteImage} = require('../../utils')

const resize = require('../../controllers/resizeLogoToSquare')
const addLogoToQr = require('../../controllers/addLogoToQR')

const defaultQR = async (req, res, filteredOptions) => {
    try{
        let img = await templates.defaultQR(filteredOptions.data, filteredOptions)
        if(req.file){
            const filePath = req.file.path
            const squareLogo = await resize(filePath, filteredOptions.width, filteredOptions.logoSize)
            img = await addLogoToQr(img, squareLogo)
        }
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