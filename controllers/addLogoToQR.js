const sharp = require('sharp');
const {randomFileName, deleteImage} = require('../utils')

const addLogoToQr = (qrImage, logoImage, qrSize = DEFAULT_QR_SIZE, customSize) => {

    let size = parseInt(qrSize / 6)

    if(customSize){
        if(customSize > 20 && customSize < 300){
            if(customSize < parseInt(qrSize/4)){
                size = parseInt(customSize)
            }
        }
    }

    const fileToBeSave = `${TEMP_LOGO_IMAGE_STORAGE_PATH}/${randomFileName('png', '12')}`

    return new Promise((resolve, reject) => {
        sharp(qrImage)
        .clone()
        .resize(null, null, { fit: 'cover' }) // Resize the background image if needed
        .composite([
            {
                input: logoImage,
                gravity: 'center',
            }
        ])
        .toFile(fileToBeSave)
        .then(async () => {
            await deleteImage(qrImage, true)
            await deleteImage(logoImage, true)
            resolve(fileToBeSave)
        })
        .catch(async (error) => {
            console.error('Error occurred while compositing the images:', error);
            await deleteImage(qrImage, true)
            await deleteImage(logoImage, true)
            reject(error)
        });
    })
}

module.exports = addLogoToQr
