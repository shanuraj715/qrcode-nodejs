

const triangleDots = (ctx, qrCodeArray, dotSize, dotRadius ) => {
    const qrCodeSize = qrCodeArray.length;

    for (let i = 0; i < qrCodeSize; i++) {
        for (let j = 0; j < qrCodeSize; j++) {
          const dotColor = qrCodeArray[i][j] === 1 ? 'black' : 'transparent';
          ctx.fillStyle = dotColor;
    
          const x = j * dotSize; // X-coordinate of the dot top-left corner
          const y = i * dotSize; // Y-coordinate of the dot top-left corner
          
          // Draw the dot as a triangle
          ctx.beginPath();
          ctx.moveTo(x + dotSize / 2, y);
          ctx.lineTo(x + dotSize, y + dotSize);
          ctx.lineTo(x, y + dotSize);
          ctx.closePath();
          ctx.fill();
        }
      }
}

module.exports = triangleDots