const fs = require('fs')

if(!fs.existsSync(TEMP_QR_IMAGE_STORAGE_PATH)) {
    fs.mkdirSync(TEMP_QR_IMAGE_STORAGE_PATH);
}