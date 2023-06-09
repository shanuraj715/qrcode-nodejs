const createQR = require('../../controllers/qrImageGenerator')

const defaultQR = async (data = 'No Data', options = {}) => {
    const defaultOptions = {
        errorCorrectionLevel: 1,
        width: 200,
        scale: 5,
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        margin: 1
    }
    return await createQR(data, {...defaultOptions, ...options, secondaryColor: options.secondaryColor === 'transparent' ? '#0000': options.secondaryColor}, true)
}

module.exports = defaultQR