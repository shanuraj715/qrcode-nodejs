const fs = require('fs')

const handler = (directoryPath = '') => {
    fs.mkdirSync(directoryPath);
}

module.exports = handler