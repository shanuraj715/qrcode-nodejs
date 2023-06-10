const fs = require('fs');
const path = require('path');

const deleteFilesInDirectory = () => {
  fs.readdir(TEMP_QR_IMAGE_STORAGE_PATH, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(TEMP_QR_IMAGE_STORAGE_PATH, file);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.error('Error retrieving file information:', error);
          return;
        }

        if (stat.isFile()) {
          fs.unlink(filePath, (unlinkError) => {
            if (unlinkError) {
              console.error('Error deleting file:', unlinkError);
            } else {
              // console.log('File deleted successfully:', filePath);
            }
          });
        }
      });
    });
  });
};

module.exports = deleteFilesInDirectory