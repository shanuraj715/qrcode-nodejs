require('./globals')
require('./exceptionHandler/handler')
require('./onStart/index')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()

app.use(bodyParser.json());
app.use('/image', express.static(path.join(__dirname, TEMP_QR_IMAGE_STORAGE_PATH)));

// ROUTES
const createQrRoute = require('./routes/createQr/create')

app.use(createQrRoute)


global.serverListner = app.listen(8000, () => {
    console.log("Server is Online at port " + 8000 );
});

