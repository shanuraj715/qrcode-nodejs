const { createCanvas } = require('canvas');
const fs = require('fs');
const utils = require('../../utils')

const circularDots = async (qrCodeArray, dotRadius) => {
  const dotSize = dotRadius * 2;
  const qrCodeSize = qrCodeArray.length;
  const canvasSize = qrCodeSize * dotSize + 20;

  // Create a new canvas
  const canvas = createCanvas(canvasSize, canvasSize);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#22a6b3';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < qrCodeSize; i++) {
        for (let j = 0; j < qrCodeSize; j++) {
          const dotColor = qrCodeArray[i][j] === 1 ? 'white' : '#22a6b3';
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc((j + 0.5) * dotSize + 10, (i + 0.5) * dotSize + 10, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
    }

  // Save the canvas as an image file
  const buffer = canvas.toBuffer('image/png');
  const filePath = utils.getImagePath(utils.randomFileName('png'))
  fs.writeFileSync(filePath, buffer);
  
  return filePath

}

module.exports = circularDots