

const errorCorrectionLevelMap = {
    '1' : 'L',
    '2' : 'M',
    '3' : 'Q',
    '4' : 'H'
}

const qrOption = (err = errorCorrectionLevelMap[4], pixelSize = 1, margin = 0, width = 0, color = {
    dark: '#000000',
    light: '#ffffff'
}, isDefault = false) => ({
    errorCorrectionLevel: err, // Set error correction level (L, M, Q, H)
    scale: pixelSize, // Set dot size
    margin,
    width: isDefault ? QR_MIN_SIZE <= width && QR_MAX_SIZE >= width ? width : DEFAULT_QR_SIZE : 0,
    color
})

module.exports = qrOption