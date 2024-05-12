import bcrypt from 'bcryptjs';
import db from './../models';
import helper from '../helper/client';
import elastic from './../config/elastic';
import _, { includes } from 'lodash';
import imgLoadFirebase from '../services/imgLoadFirebase';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

import moment from 'moment';
import { reject, resolve } from 'bluebird';

let salt = 7;

let createDoctor = (doctor) => {
    doctor.roleId = 2;
    doctor.password = bcrypt.hashSync(doctor.password, salt);
    return new Promise(async (resolve, reject) => {
        let newDoctor = await db.User.create(doctor);
        let item = {
            doctorId: newDoctor.id,
            specializationId: doctor.specializationId,
        };
        await db.Doctor_User.create(item);

        //create doctor elastic

        resolve(newDoctor);
    });
};

let getInfoDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 2 },
                include: [
                    { model: db.Doctor_User, required: false },
                    { model: db.Patient, required: false, where: { statusId: 1 } },
                ],
            });
            await Promise.all(
                doctors.map(async (doctor) => {
                    if (doctor.Doctor_User) {
                        let specialization = await helper.getSpecializationById(doctor.Doctor_User.specializationId);
                        let countBooking = doctor.Patients.length;
                        doctor.setDataValue('specializationName', specialization.name);
                        doctor.setDataValue('countBooking', countBooking);
                    } else {
                        doctor.setDataValue('specializationName', 'null');
                        doctor.setDataValue('countBooking', 0);
                    }
                    return doctor;
                })
            );
            resolve(doctors);
        } catch (e) {
            reject(e);
        }
    });
};
let getInforPatients = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let patients = await db.User.findAll({
                where: {
                    roleId: 3,
                },
                include: [
                    { model: db.Doctor_User, required: false },
                    { model: db.Patient, required: false, where: { statusId: 1 } },
                ],
            });
            resolve(patients);
        } catch (error) {
            reject(error);
        }
    });
};
let findUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
                raw: true,
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};

let comparePassword = (password, user) => {
    return bcrypt.compare(password, user.password);
};

let findUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                // attributes: ['id', 'name', 'avatar', 'roleId', 'isActive'],
                extends: ['password'],
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};

function stringToDate(_date, _format, _delimiter) {
    let formatLowerCase = _format.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = _date.split(_delimiter);
    let monthIndex = formatItems.indexOf('mm');
    let dayIndex = formatItems.indexOf('dd');
    let yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}

let getInfoStatistical = (month) => {
    return new Promise(async (resolve, reject) => {
        try {
            let startDate = Date.parse(stringToDate(`01/${month}/2020`, 'dd/MM/yyyy', '/'));
            let endDate = Date.parse(stringToDate(`31/${month}/2020`, 'dd/MM/yyyy', '/'));

            let patients = await db.Patient.findAndCountAll({
                attributes: ['id', 'doctorId'],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });

            let doctors = await db.User.findAndCountAll({
                attributes: ['id'],
                where: {
                    roleId: 2,
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });

            let posts = await db.Post.findAndCountAll({
                attributes: ['id', 'writerId'],
                where: {
                    forSpecializationId: -1,
                    forDoctorId: -1,
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });

            let bestDoctor = '';

            if (+patients.count > 0) {
                let bestDoctorIdArr = _(patients.rows)
                    .groupBy('doctorId')
                    .map((v, doctorId) => ({
                        doctorId,
                        patientId: _.map(v, 'id'),
                    }))
                    .value();
                let doctorObject = _.maxBy(bestDoctorIdArr, function (o) {
                    return o.patientId.length;
                });
                bestDoctor = await db.User.findOne({
                    where: {
                        id: doctorObject.doctorId,
                    },
                    attributes: ['id', 'name'],
                });
                bestDoctor.setDataValue('count', doctorObject.patientId.length);
            }

            resolve({
                patients: patients,
                doctors: doctors,
                posts: posts,
                bestDoctor: bestDoctor,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getInfoDoctorChart = (month) => {
    return new Promise(async (resolve, reject) => {
        try {
            let startDate = Date.parse(stringToDate(`01/${month}/2024`, 'dd/MM/yyyy', '/'));
            let endDate = Date.parse(stringToDate(`31/${month}/2024`, 'dd/MM/yyyy', '/'));
            let patients = await db.Patient.findAndCountAll({
                attributes: ['id', 'doctorId', 'statusId', 'isSentForms'],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });
            resolve({ patients: patients });
        } catch (e) {
            reject(e);
        }
    });
};

let createAllDoctorsSchedule = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let timeArr = [
                '08:00 - 09:00',
                '09:00 - 10:00',
                '10:00 - 11:00',
                '11:00 - 12:00',
                '13:00 - 14:00',
                '14:00 - 15:00',
                '15:00 - 16:00',
                '16:00 - 17:00',
            ];
            let sevenDaySchedule = [];
            for (let i = 0; i < 7; i++) {
                let date = moment(new Date()).add(i, 'days').locale('vi').format('DD/MM/YYYY');
                sevenDaySchedule.push(date);
            }

            let doctors = await db.User.findAll({
                where: {
                    roleId: 2,
                },
                attributes: ['id', 'name'],
                raw: true,
            });

            // Check if appointments are created before
            let isCreatedBefore = false;

            // Check the first doctor with date and time
            let check = await db.Schedule.findAll({
                where: {
                    doctorId: doctors[0].id,
                    date: sevenDaySchedule[0],
                    time: timeArr[0],
                },
            });

            if (check && check.length > 0) {
                isCreatedBefore = true;
            }

            if (!isCreatedBefore) {
                if (doctors && doctors.length > 0) {
                    await Promise.all(
                        doctors.map((doctor) => {
                            sevenDaySchedule.map((day) => {
                                timeArr.map(async (time) => {
                                    let schedule = {
                                        doctorId: doctor.id,
                                        date: day,
                                        time: time,
                                        maxBooking: 2,
                                        sumBooking: 0,
                                    };
                                    await db.Schedule.create(schedule);
                                });
                            });
                        })
                    );
                    resolve(
                        'Cuộc hẹn được tạo thành công (trong 7 ngày). Vui lòng kiểm tra cơ sở dữ liệu của bạn (schedule table)'
                    );
                }
            } else {
                resolve('Các cuộc hẹn bị trùng lặp. Vui lòng kiểm tra cơ sở dữ liệu của bạn (schedule table)');
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctorsSchedule = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedules = await db.Schedule.findAll({
                attributes: ['doctorId', 'date', 'time'],
                raw: true,
            });
            resolve(schedules);
        } catch (e) {
            reject(e);
        }
    });
};
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let supporters = await db.User.findAll({
                where: { roleId: 3 },
            });

            resolve(supporters);
        } catch (e) {
            reject(e);
        }
    });
};
let getAllCodeService = async (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameder!!',
                });
            } else {
                let res = {};
                let allcode = await db.Allcodes.findAll({
                    where: { type: typeInput },
                    raw: true,
                });
                res.errCode = 0;
                res.data = allcode;
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: allcode,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword); //thay vi dung return
        } catch (error) {
            reject(error);
        }
    });
};
let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required Parameter!',
                });
            }
            let user = await db.User.findOne({
                where: { email: data.email },
                raw: false,
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`,
                });
            } else {
                let hashPassword = await hashUserPassword(data.password);
                user.name = data.name;
                user.address = data.address;
                user.phone = data.phone;
                user.birthday = data.birthday;
                user.avatar = data.avatar;
                user.password = hashPassword;
                user.roleId = data.roleId;
                user.isActive = data.isActive;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update the user success!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserDataFile = async (data, filePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required Parameter!',
                });
            }
            let user = await db.User.findOne({
                where: { email: data.email },
                raw: false,
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: `user's not found!`,
                });
            } else {
                user.name = data.name;
                user.description = data.description;
                user.phone = data.phone;
                user.gender = data.gender;
                // Nếu có file ảnh được upload, gửi ảnh lên Firebase và lấy URL
                let url = data.avatar;
                // if (filePath) {
                //     // let urldt = await imgLoadFirebase.uploadImg(filePath);
                //     url = await imgLoadFirebase.getUrlFirebase(filePath);
                //     console.log('url from firebase ', url);
                // }
                if (url) {
                    user.avatar = url;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update the user success!',
                    user,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateProfile = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required Parameter!',
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: `user's not found!`,
                });
            } else {
                user.name = data.name;
                user.description = data.description;
                user.address = data.address;
                user.phone = data.phone;
                user.gender = data.gender;
                // Nếu có file ảnh được upload, gửi ảnh lên Firebase và lấy URL
                let url = data.avatar;
                if (url) {
                    user.avatar = url;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update the user success!',
                    user,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const emailExists = await checkUserEmail(data.email);
            if (emailExists) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email đã tồn tại trong hệ thống. Vui lòng sử dụng một email khác.',
                });
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                name: data.name,
                phone: data.phone,
                birthday: data.birthday,
                avatar: data.avatar,
                gender: data.gender,
                address: data.address,
                description: data.description,
                roleId: '3',
                isActive: 1,
            });
            // console.log(data);
            resolve({
                errCode: 0,
                errMessage: 'OK',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createDoctor: createDoctor,
    getInfoDoctors: getInfoDoctors,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword,
    getInfoStatistical: getInfoStatistical,
    getInfoDoctorChart: getInfoDoctorChart,
    createAllDoctorsSchedule: createAllDoctorsSchedule,
    getAllDoctorsSchedule: getAllDoctorsSchedule,
    getAllUsers: getAllUsers,
    getAllCodeService: getAllCodeService,
    updateUser: updateUser,
    updateUserDataFile: updateUserDataFile,
    createNewUser: createNewUser,
    updateProfile: updateProfile,
};
