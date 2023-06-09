const Jimp = require('jimp')

function create2DArray(arr, subarrayLength) {
    const length = arr.length;
    const result = [];
  
    for (let i = 0; i < length; i += subarrayLength) {
      const subarray = arr.slice(i, i + subarrayLength);
      result.push(subarray);
    }
    return result;
  }

const qrToArray = async (filepath, dimention) => {
    return await new Promise((resolve, reject) => {
        Jimp.read(filepath, (err, image) => {
            if (err){
                reject(err)
                return
            };
          
            const qrCodeArray = [];
            for (let y = 0; y < image.bitmap.height; y++) {
              for (let x = 0; x < image.bitmap.width; x++) {
                const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));
                const isBlack = pixelColor.r === 0 && pixelColor.g === 0 && pixelColor.b === 0;
          
                qrCodeArray.push(isBlack ? 1 : 0);
              }
            }

            if(dimention === 1){
                resolve(qrCodeArray)
            }
            else{
                const rows = Math.sqrt(qrCodeArray.length)
                const twoDArray = create2DArray(qrCodeArray, rows);
                resolve(twoDArray)
            }
          
          });
    })
}
module.exports = qrToArray