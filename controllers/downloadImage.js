const axios = require('axios');
const fs = require('fs');
const {randomFileName} = require('../utils')

const downloadImage = async (URL) => {
    try{    
        const response = await axios({
        url: URL,
        responseType: 'stream',
        })
        response.data.pipe(fs.createWriteStream(`${TEMP_LOGO_IMAGE_STORAGE_PATH}/${randomFileName('png', '16')}`));
    }
    catch(err){
        console.log(err)
    }
}

module.exports = downloadImage;