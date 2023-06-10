const { createCanvas } = require('canvas');
const fs = require('fs');
const {getImagePath, randomFileName, dotRadiusArrayFromNabours} = require('../../utils')



const edgeRounded = async (qrCodeArray, options) => {
	const defaultOptions = {
		errorCorrectionLevel: 1,
		width: 200,
		primaryColor: '#000000',
		secondaryColor: '#ffffff',
		margin: 1,
		...options
	}
	const oneRowMaxDots = qrCodeArray.length
	const dotSize = parseInt(defaultOptions.width / (oneRowMaxDots + (defaultOptions.margin * 2)));
	const qrCodeSize = qrCodeArray.length;
	const margin = dotSize * defaultOptions.margin
	const canvasSize = qrCodeSize * dotSize + (margin * 2);

	// Create a new canvas
	const canvas = createCanvas(canvasSize, canvasSize);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = defaultOptions.secondaryColor;
	ctx.fillRect(0, 0, canvasSize, canvasSize);

	for (let i = 0; i < qrCodeSize; i++) {
		for (let j = 0; j < qrCodeSize; j++) {
			let dotColor = qrCodeArray[i][j] === 1 ? defaultOptions.primaryColor : defaultOptions.secondaryColor;
			ctx.fillStyle = dotColor;
			ctx.beginPath();
			ctx.roundRect(margin + (i) * dotSize, margin + (j) * dotSize, dotSize, dotSize, dotRadiusArrayFromNabours(qrCodeArray, i, j, dotSize));
			ctx.fill();
		}
	}

	// Save the canvas as an image file
	const buffer = canvas.toBuffer('image/png');
	const filePath = getImagePath(randomFileName('png'))
	fs.writeFileSync(filePath, buffer);
	
	return filePath

}

module.exports = edgeRounded