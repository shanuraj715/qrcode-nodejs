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

function isSquareDot(array, i, j) {
    // Define the coordinates of the three square shapes in the QR code
    const square1 = { top: 0, left: 0, size: 7, key: 0 };
    const square2 = { top: 0, left: array.length - 7, size: 7, key: 1 };
    const square3 = { top: array.length - 7, left: 0, size: 7, key: 2 };
  
    // Check if the indices are within any of the square shapes
    function isInsideSquare(square, i, j) {
      return i >= square.top && i < square.top + square.size && j >= square.left && j < square.left + square.size
    }

    const isFirstSquareDot = isInsideSquare(square1, i, j)
    const isSecondSquareDot = isInsideSquare(square2, i, j)
    const isThirdSquareDot = isInsideSquare(square3, i, j)

    const dotInSquare = (() => {
        if(isFirstSquareDot) return 0
        if(isSecondSquareDot) return 1
        if(isThirdSquareDot) return 2
        return null
    })()

    return {
        val: dotInSquare,
        key: isFirstSquareDot || isSecondSquareDot || isThirdSquareDot
    }
  }

const getFillColor = (array, i, j, primaryColor, secondaryColor, squareColor) => {
    if(squareColor){
        const colors = squareColor.replaceAll(' ', '').split(',')
        const colorsLength = colors.length
        let color = primaryColor
        const squareDot = isSquareDot(array, i, j)
        color = colorsLength > 1 ? colors[squareDot.val] : colors[0]
        return array[i][j] === 1 ? squareDot.key ? color : primaryColor : secondaryColor
    }

    return array[i][j] ? primaryColor : secondaryColor
}

module.exports = {
    randomFileName,
    getImagePath,
    getImageHttpPath,
    deleteImage,
    getLogoPath,
    dotRadiusArrayFromNabours,
    isSquareDot,
    getFillColor
}