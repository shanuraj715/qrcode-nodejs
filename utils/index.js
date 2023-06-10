const fs = require('fs')

const randomFileName = (fileExtension, fileNameLength = 16) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    let randomName = '';
  
    // Generate random filename
    for (let i = 0; i < fileNameLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomName += characters.charAt(randomIndex);
    }
  
    // Combine filename, random name, and extension
    const randomFilename = `${randomName}.${fileExtension}`;
  
    return randomFilename;
}

const getImagePath = (filename) => {
    return `${TEMP_QR_IMAGE_STORAGE_PATH}/${filename}`
}

const getLogoPath = (filename) => {
    return `${TEMP_LOGO_IMAGE_STORAGE_PATH}/${filename}`
}

const getImageHttpPath = (filename) => {
    return `${IMAGE_SERVE_DOMAIN}${IMAGE_SERVER_DIRECTORY}/${filename}`
}

const deleteImage = async (filename, isPath) => {
    let filePath = filename
    if(!isPath){
        filePath = getImagePath(filename)
    }
    try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error(`Failed to delete the file: ${err}`);
      }
}

const dotRadiusArrayFromNabours = (array, i, j, pixelSize) => {

    const l = i > 0 ? array[i - 1][j] : 0;
    const t = j > 0 ? array[i][j - 1] : 0;
    const r = i < array.length - 1 ? array[i + 1][j] : 0;
    const b = j < array.length - 1 ? array[i][j + 1] : 0

      if (array[i][j] !== 1) return [0]

    const rad = pixelSize/2.2

    // if (b === 1 && r === 1 && t === 1 && l === 1) {
    //     return [rad]
    // }

    if (b === 1 && r === 0 && t === 0 && l === 0) {
        return [rad, rad, 0, 0]
    }

    if (b === 0 && r === 0 && t === 1 && l === 0) {
        return [0, 0, rad, rad]
    }

    if (b === 0 && r === 1 && t === 0 && l === 0) {
        return [rad, 0, 0, rad]
    }

    if (b === 0 && r === 0 && t === 0 && l === 1) {
        return [0, rad, rad, 0]
    }

    if (b === 0 && r === 0 && t === 0 && l === 0) {
        return [rad]
    }

    if (b === 1 && r === 1 && t === 0 && l === 0) {
        return [rad, 0, 0, 0]
    }

    if (b === 0 && r === 0 && t === 1 && l === 1) {
        return [0, 0, rad, 0]
    }

    if (b === 1 && r === 0 && t ===0 && l === 1) {
        return [0, rad, 0, 0]
    }

    if (b === 0 && r === 1&& t === 1 && l === 0) {
        return [0, 0, 0, rad]
    }
    return [0]
}

module.exports = {
    randomFileName,
    getImagePath,
    getImageHttpPath,
    deleteImage,
    getLogoPath,
    dotRadiusArrayFromNabours
}