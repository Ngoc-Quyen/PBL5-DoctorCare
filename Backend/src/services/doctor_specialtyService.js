import { where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';

let checkDoctor = async (idDoctor) => {
    try {
        let doctor = await db.User.findOne({
            where: { email: idDoctor, roleId: '2' },
        });
        if (!doctor) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        reject(error);
    }
};
let checkSpecialty = async (idSpecialty) => {
    return new Promise(async (resolve, reject) => {
        let specialty = await db.Specialty.findOne({
            where: { id: idSpecialty },
        });
        if (specialty) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
};
let createDoctorSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findOne({
                where: { email: data.doctorId, roleId: '2' },
            });
            if (!doctor) {
                resolve({
                    errCode: 1,
                    errMessage: 'khong co bac si voi email nay',
                });
            } else {
                await db.DoctorSpecialty.create({
                    doctorId: data.doctorId,
                    specialtyId: data.specialtyId,
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
let getAllDoctorSpecialty = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let list = await db.DoctorSpecialty.findAll();
            if (list) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    list,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Khong co bac si nao',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getListDoctorbySpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let list = await db.DoctorSpecialty.findAll({
                where: { specialtyId: data.specialtyId },
            });
            if (list) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    list,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Khong co bac si trong chuyen khoa nay',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getDoctorbyEmail = async (emailDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!emailDoctor) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required Parameter!',
                });
            }
            let list = await db.DoctorSpecialty.findAll({
                where: { doctorId: emailDoctor },
            });
            if (!list) {
                resolve({
                    errCode: 2,
                    errMessage: 'Khong co bac si voi email nay!',
                });
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    list,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getDoctorbyEmailSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.specialtyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required Parameter!!',
                });
            }
            let doctor = await db.DoctorSpecialty.findOne({
                where: {
                    doctorId: data.doctorId,
                    specialtyId: data.specialtyId,
                },
            });
            if (!doctor) {
                resolve({
                    errCode: 2,
                    errMessage: 'Chuyen khoa nay khong co bac si nay!',
                });
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    doctor,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteDoctorSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.DoctorSpecialty.findOne({
                where: {
                    doctorId: data.doctorId,
                    specialtyId: data.specialtyId,
                },
            });
            if (doctor) {
                await db.DoctorSpecialty.destroy({
                    where: {
                        doctorId: data.doctorId,
                        specialtyId: data.specialtyId,
                    },
                });
                resolve({
                    errCode: 0,
                    errMessage: `The doctor in specialty is deleted`,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `The doctor in specialty isn't exist`,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateDoctorSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.DoctorSpecialty.findOne({
                where: {
                    id: data.id,
                },
                raw: false,
            });
            if (!doctor) {
                resolve({
                    errCode: 1,
                    errMessage: `doctor's not found!`,
                });
            } else {
                doctor.doctorId = data.doctorId;
                doctor.specialtyId = data.specialtyId;
                await doctor.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update doctorSpecialty success!!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    // tao doctor vao Specialty
    createDoctorSpecialty: createDoctorSpecialty,
    // select all bang
    getAllDoctorSpecialty: getAllDoctorSpecialty,
    // xoa doctor trong specialty
    deleteDoctorSpecialty: deleteDoctorSpecialty,
    // select danh sach doctor co trong specialtyId
    getListDoctorbySpecialty: getListDoctorbySpecialty,
    // select danh sach specialty ma co email doctor
    getDoctorbyEmail: getDoctorbyEmail,
    // select doctor by email & specialty
    getDoctorbyEmailSpecialty: getDoctorbyEmailSpecialty,
    // Cap nhat lai chuyen khoa cho bac si
    updateDoctorSpecialty: updateDoctorSpecialty,
};
