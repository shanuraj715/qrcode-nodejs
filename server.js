require('./globals')
require('./exceptionHandler/handler')
require('./onStart/index')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/image', express.static(path.join(__dirname, TEMP_QR_IMAGE_STORAGE_PATH)));

// ROUTES
const createQrRoute = require('./routes/createQr/create')

const test = require('./test')

app.use(createQrRoute)

test()


global.serverListner = app.listen(8000, () => {
    console.log("Server is Online at port " + 8000 );
});


