require('dotenv').config();
import express from 'express';
import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import passPort from 'passport';
import session from './config/session';

let app = express();
// admin.initializeApp(
//     {
//         credential: admin.credential.cert(serviceAccount),
//         storageBucket: process.env.StorageBucket, // Thay thế bằng địa chỉ bucket của bạn
//     },
//     'PBL5-DoctorCare'
// );

app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config session
session.configSession(app);

configViewEngine(app);
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// config Passportjs
app.use(passPort.initialize());
app.use(passPort.session());

initRoutes(app);

let port = process.env.PORT;
app.listen(port || 6868, '0.0.0.0', () => console.log(`Doctors care app is running on port ${port}!`));
