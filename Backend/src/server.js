import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRouter from './route/web';
import connecDB from './config/connectDB';
// import dotenv from '.env';
require('dotenv').config();
let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

viewEngine(app);
initWebRouter(app);

connecDB();

let port = process.env.PORT || 6969;
//port == undefined => port = 6969
app.listen(port, () => {
    console.log('Backend NodeJS is running on the port: ' + port);
});
