const express = require('express')
const createQR = require('../../controllers/qrImageGenerator')
const qrToArray = require('../../controllers/qrToArray')
const drawQRCode = require('../../qr/qrImageCreator')
const allowedOptions = require('../../controllers/allowedOptions')

const templates = require('../../qr/templates')

const router = express.Router()
const utils = require('../../utils')

const defaultQR = require('./defaultQR')

const handler = require('../../controllers/saveImageFromReq')

const resize = require('../../controllers/resizeLogoToSquare')
const addLogoToQR = require('../../controllers/addLogoToQR')

router.post('/create/:type', handler, async (req, res) => {
    const {type} = req.params
    const options = req.body
    const filteredOptions = {}
    Object.keys(options).forEach(item => {
        if(allowedOptions.includes(item)){
            filteredOptions[item] = options[item]
        }
    })
    if(req.file){
        filteredOptions.errorCorrectionLevel = 4
    }
    if(type === 'default'){
        await defaultQR(req, res, filteredOptions)
        return // no need to execute below code
    }

    try{
        let img = await createQR(filteredOptions.data, {...filteredOptions, primaryColor: '#000000', secondaryColor: '#ffffff'}, false)
        const array = await qrToArray(img, 2)
        // console.log(array)
        // await utils.deleteImage(img, true)
        let filePath = ''
        switch(type){
            case 'circular': {
                filePath = await templates.circular(array, filteredOptions)
                break
            }
            case 'edge-rounded': {
                filePath = await templates.edgeRounded(array, filteredOptions)
                break
            }
        }
        if(req.file){
            const logoPath = req.file.path
            const squareLogo = await resize(logoPath, filteredOptions.width, filteredOptions.logoSize)
            filePath = await addLogoToQR(filePath, squareLogo)
        }
        await utils.deleteImage(img, true)
        res.status(201).json(successResponse(201, {
            url: utils.getImageHttpPath(filePath.split('/').at(-1))
        }))
        return
    }
    catch(err){
        res.status(500).json(failResponse(500, ['Server is facing some issue.']))
        return
    }
})


module.exports = router