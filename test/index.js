const downloadImage = require('../controllers/downloadImage')
const createQR = require('../controllers/qrImageGenerator')
const qrToArray = require('../controllers/qrToArray')
const drawQRCode = require('../qr/qrImageCreator')
const allowedOptions = require('../controllers/allowedOptions')
const fs = require('fs')

const utils = require('../utils')
const deleteTempDir = require('./deleteAllTempFiles')


const testFunction = async () => {
    deleteTempDir()
    // await downloadImage('https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg')
}

module.exports = testFunction