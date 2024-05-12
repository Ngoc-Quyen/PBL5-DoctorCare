// import * as admin from 'firebase-admin';
// import serviceAccountKey from '../serviceAccountKey.json';
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase-admin/storage';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import config from '../config/firebaseConfig';
//Initialize a firebase application
initializeApp(config.firebaseConfig);
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountKey),
//     storageBucket: process.env.StorageBucket, // Thay thế bằng địa chỉ bucket của bạn
// });
// let bucket = admin.storage().bucket();

let uploadImg = async (fileData) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('fileData from imgLoad: ', fileData.path);
            if (!fileData.buffer) {
                console.log('File buffer is empty: ', fileData.buffer);
                resolve();
            }
            let fileBuffer = Buffer.from(fileData.buffer, 'binary');
            let fileStream = new Readable();
            fileStream.push(fileBuffer);
            fileStream.push(null);
            let metadata = {
                metadata: {
                    contentType: fileData.mimetype,
                },
            };
            let uploadResponse = await bucket.upload(fileStream, {
                destination: fileData.originalname,
                metadata: metadata,
            });
            let url = uploadResponse[0].metadata.mediaLink;
            resolve(url);
        } catch (error) {
            reject(error);
        }
    });
};
let storage = getStorage();
let getUrlFirebase = async (fileData) => {
    let dateTime = giveCurrentDateTime();
    let storageRef = ref(storage, `images/${fileData.originalname + dateTime}`);
    let metadata = {
        contentType: fileData.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, fileData.buffer, metadata);
    let downloadURL = await getDownloadURL(snapshot.ref);
    resolve(downloadURL);
};
let giveCurrentDateTime = () => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = date + ' ' + time;
    return dateTime;
};
module.exports = {
    uploadImg: uploadImg,
    getUrlFirebase: getUrlFirebase,
};
