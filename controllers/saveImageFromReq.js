const multer = require('multer');
const {randomFileName, getLogoPath} = require('../utils')

// Set up the multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory where files should be stored
    cb(null, TEMP_LOGO_IMAGE_STORAGE_PATH);
  },
  filename: function (req, file, cb) {
    // Specify a unique file name for the uploaded file
    const filename = randomFileName('png', 12)
    cb(null, filename);
    // req.appendedData.logoPath = getLogoPath(filename)
  }
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });


const handler = (req, res, next) => {

    // if('user have no access to upload logo'){
        // return (req, res, next) => {
        //     // next();
        // }
    // }

    // if(req){
    // }

    // return (req, res, next) => {
    //     console.log(req.files)
    //     next()
    // }

    return upload.single('file')
}

module.exports = handler();