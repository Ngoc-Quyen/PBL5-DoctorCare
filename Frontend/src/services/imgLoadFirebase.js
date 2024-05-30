<<<<<<< HEAD
// import { initializeApp } from 'firebase/app';
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import config from '../config/firebaseConfig';
// //Initialize a firebase application
// initializeApp(config.firebaseConfig);
// let uploadImg = async (fileData) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log('fileData from imgLoad: ', fileData.path);
//             if (!fileData.buffer) {
//                 console.log('File buffer is empty: ', fileData.buffer);
//                 resolve();
//             }
//             let fileBuffer = Buffer.from(fileData.buffer, 'binary');
//             let fileStream = new Readable();
//             fileStream.push(fileBuffer);
//             fileStream.push(null);
//             let metadata = {
//                 metadata: {
//                     contentType: fileData.mimetype,
//                 },
//             };
//             let uploadResponse = await bucket.upload(fileStream, {
//                 destination: fileData.originalname,
//                 metadata: metadata,
//             });
//             let url = uploadResponse[0].metadata.mediaLink;
//             resolve(url);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };
// let storage = getStorage();
// let getUrlFirebase = async (fileData) => {
//     let dateTime = giveCurrentDateTime();
//     let storageRef = ref(storage, `images/${fileData.originalname + dateTime}`);
//     let metadata = {
//         contentType: fileData.mimetype,
//     };
//     const snapshot = await uploadBytesResumable(storageRef, fileData.buffer, metadata);
//     let downloadURL = await getDownloadURL(snapshot.ref);
//     resolve(downloadURL);
// };
// let giveCurrentDateTime = () => {
//     let today = new Date();
//     let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
//     let dateTime = date + ' ' + time;
//     return dateTime;
// };
// module.exports = {
//     uploadImg: uploadImg,
//     getUrlFirebase: getUrlFirebase,
// };

const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { Readable } = require('stream');
const config = require('../config/firebaseConfig').firebaseConfig;

// Initialize Firebase
const firebaseApp = initializeApp(config);
const storage = getStorage(firebaseApp);

=======
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { Readable } = require('stream');
const config = require('../config/firebaseConfig').firebaseConfig;

// Initialize Firebase
const firebaseApp = initializeApp(config);
const storage = getStorage(firebaseApp);
>>>>>>> branchTestQ
const uploadImg = async (fileData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!fileData.buffer) {
                console.log('File buffer is empty: ', fileData.buffer);
                resolve(null);
                return;
            }
<<<<<<< HEAD

=======
>>>>>>> branchTestQ
            const dateTime = giveCurrentDateTime();
            const storageRef = ref(storage, `images/${fileData.originalname}-${dateTime}`);
            const metadata = {
                contentType: fileData.mimetype,
            };
<<<<<<< HEAD

=======
>>>>>>> branchTestQ
            const snapshot = await uploadBytesResumable(storageRef, fileData.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            resolve(downloadURL);
        } catch (error) {
            reject(error);
        }
    });
};
<<<<<<< HEAD

=======
>>>>>>> branchTestQ
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
        today.getDate()
    ).padStart(2, '0')}`;
    const time = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(
        today.getSeconds()
    ).padStart(2, '0')}`;
    return `${date} ${time}`;
};

module.exports = {
    uploadImg: uploadImg,
};
