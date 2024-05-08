import * as admin from 'firebase-admin';

const bucket = admin.storage().bucket();
let getImgUrl = async (fileName) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tao url cho anh
            let url = await bucket.file(fileName).getSignedUrl({
                action: 'read',
                expires: '08-05-2500', // Đặt thời gian hết hạn cho URL
            });
            resolve(url);
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    getImgUrl: getImgUrl,
};
