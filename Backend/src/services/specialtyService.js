import { where } from 'sequelize';
import db from '../models/index';

let getAllSpecialty = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!db || !db.Specialty) {
                resolve({
                    errCode: 2,
                    errMessage: 'Database or Specialty model is not properly initialized.',
                });
            }
            let specialtise = await db.Specialty.findAll();
            resolve(specialtise);
            if (!specialtise) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chua co chuyen khoa trong du lieu',
                });
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    specialtise,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let checkId = async (idSpecialty) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await db.Specialty.findOne({
                where: { id: idSpecialty },
            });
            if (isExist) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let createSpecialty = async (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            let idExists = await checkId(data.id);
            if (idExists) {
                resolve({
                    errCode: 1,
                    errMessage: 'id đã tồn tại trong hệ thống. Vui lòng sử dụng một id khác.',
                });
            } else {
                let url = data.avatar;
                if (file) {
                    url = await imgLoadFirebase.getImgUrl(file.path);
                }
                await db.Specialty.create({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    avatar: url,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteSpecialty = async (idSpecialty) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { id: idSpecialty },
            });
            if (!specialty) {
                resolve({
                    errCode: 2,
                    errMessage: `The specialty isn't exist`,
                });
            } else {
                await db.Specialty.destroy({
                    where: { id: idSpecialty },
                });
                resolve({
                    errCode: 0,
                    errMessage: `The specialty is deleted`,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateSpecialtyData = async (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required Parameter!',
                });
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (!specialty) {
                resolve({
                    errCode: 1,
                    errMessage: `specialty's not found!`,
                });
            } else {
                specialty.name = data.name;
                specialty.description = data.description;
                // Nếu có file ảnh được upload, gửi ảnh lên Firebase và lấy URL
                let url = data.avatar;
                if (file) {
                    url = await imgLoadFirebase.getImgUrl(file.path);
                }
                specialty.avatar = url;
                await specialty.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update the specialty success!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    getAllSpecialty: getAllSpecialty,
    createSpecialty: createSpecialty,
    deleteSpecialty: deleteSpecialty,
    updateSpecialtyData: updateSpecialtyData,
};
