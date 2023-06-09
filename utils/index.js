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

module.exports = {
    randomFileName,
    getImagePath,
    getImageHttpPath,
    deleteImage
}