const qr = require('qrcode');
const utils = require('../utils/index')

const qrOption = require('./getQrOption')


const createQrImage = async (data = 'No Data', options = {}, isDefault = false) => {
    const defaultOptions = {
        errorCorrectionLevel : 4,
        scale : 1,
        margin : 0,
        primaryColor : "#000000",
        secondaryColor : "#ffffff",
        width : 0,
        ...options
    }
    
    const {errorCorrectionLevel, scale, margin, width } = defaultOptions
    const colors = {dark: defaultOptions.primaryColor, light: defaultOptions.secondaryColor}

    // console.log(errorCorrectionLevel)
    return await new Promise((resolve, reject) => {
        const image = utils.getImagePath(utils.randomFileName('png'))
        console.log(data)
        qr.toFile(image, data, qrOption(errorCorrectionLevel, scale, margin, width, colors, isDefault), err => {
            if(err){
                console.log(err)
                reject(err)
                return
            }
            resolve(image)
        })
    })
}

module.exports = createQrImage