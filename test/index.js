const edgeRounded = require('../qr/templates/edgeRounded')
const createQR = require('../controllers/qrImageGenerator')
const qrToArray = require('../controllers/qrToArray')
const drawQRCode = require('../qr/qrImageCreator')
const allowedOptions = require('../controllers/allowedOptions')
const fs = require('fs')

const utils = require('../utils')
const deleteTempDir = require('./deleteAllTempFiles')


const testFunction = async () => {
    deleteTempDir()
    const img = await createQR("https://shanuthewebdev.in", {primaryColor: '#000000', secondaryColor: '#ffffff', errorCorrectionLevel: 3}, false)
    const array = await qrToArray(img, 2)
    const path = await edgeRounded(array, {
        errorCorrectionLevel: 1,
        width: 750,
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        margin: 1
    })
}

module.exports = testFunction