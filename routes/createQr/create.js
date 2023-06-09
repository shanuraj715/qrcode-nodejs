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
    try{
        switch(type){
            case 'default': {
                const img = await templates.defaultQR(filteredOptions.data, filteredOptions)
                res.status(201).json(successResponse(201, {
                    url: utils.getImageHttpPath(img.split('/').at(-1))
                }))
                break
            }
            case 'circular': {
                const img = await createQR(filteredOptions.data, {filteredOptions, primaryColor: '#000000', secondaryColor: '#ffffff'}, false)
                const array = await qrToArray(img, 2)
                const filePath = await templates.circular(array, filteredOptions)
                await utils.deleteImage(img, true)
                res.status(201).json(successResponse(201, {
                    url: utils.getImageHttpPath(filePath.split('/').at(-1))
                }))
                break
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(failResponse(500, ['Server is facing some issue.']))
    }
})


module.exports = router