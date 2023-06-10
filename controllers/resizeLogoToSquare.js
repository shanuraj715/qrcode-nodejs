const sharp = require('sharp')
const {randomFileName, deleteImage} = require('../utils')


const resize = async (filepath, qrSize = DEFAULT_QR_SIZE, customSize) => {
    
    let size = parseInt(qrSize / 5);
    if(customSize){
        if(customSize > 20 && customSize < 300){
            if(customSize < parseInt(qrSize/3)){
                size = parseInt(customSize)
            }
        }
    }

    return new Promise((resolve, reject) => {
        const fileToBeSaved = `${TEMP_LOGO_IMAGE_STORAGE_PATH}/${randomFileName('png', '12')}`
        sharp(filepath)
        .resize(size, size, { fit: 'fill' })
        .toFile(fileToBeSaved)
        .then(async () => {
            await deleteImage(filepath, true)
            resolve(fileToBeSaved)
          })
          .catch(async (error) => {
            await deleteImage(filepath, true)
            reject(error)
          });
    })
}

module.exports = resize