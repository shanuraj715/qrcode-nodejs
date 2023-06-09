const express = require('express')
const createQR = require('../../controllers/qrImageGenerator')
const qrToArray = require('../../controllers/qrToArray')
const drawQRCode = require('../../qr/qrImageCreator')
const allowedOptions = require('../../controllers/allowedOptions')

const templates = require('../../qr/templates')

const router = express.Router()
const utils = require('../../utils')

router.post('/create/:type', async (req, res) => {
    const {type} = req.params
    const options = req.body
    const filteredOptions = {}
    Object.keys(options).forEach(item => {
        if(allowedOptions.includes(item)){
            filteredOptions[item] = options[item]
        }
    })
    console.log(filteredOptions)
    switch(type){
        case 'default': {
            const img = await templates.defaultQR(filteredOptions.data, filteredOptions)
            res.status(201).json(successResponse(201, {
                url: utils.getImageHttpPath(img.split('/').at(-1))
            }))
            break
        }
        case 'circular': {
            const img = await createQR("Shanu Raj Is A Good Boy.", {})
            const array = await qrToArray(img, 2)
            console.log(img)
            templates.circular(req, array, 16, './qr_code.png')
            const filePath = await utils.deleteImage(img, true)
            res.status(201).json(successResponse(201, {
                url: utils.getImageHttpPath(filePath)
            }))
            break
        }
    }
})


module.exports = router