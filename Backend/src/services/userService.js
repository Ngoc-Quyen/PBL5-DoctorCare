import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { raw } from 'body-parser';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'], // Lay vai truong mong muon
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    // user already exist
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Pls try other email!`;
            }
            resolve(userData);
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
let checkExistingEmail = async (email) => {
    try {
        const existingUser = await db.User.findOne({ where: { email: email } });
        return existingUser ? true : false;
    } catch (error) {
        throw error;
    }
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
let getAllUsers = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userEmail === 'ALL' || userEmail === 'all') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            if (userEmail !== 'ALL' && userEmail !== 'all' && userEmail) {
                users = await db.User.findOne({
                    where: { email: userEmail },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
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
            console.log(data);
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                roleId: '3',
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
let deleteUser = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`,
                });
            } else {
                await db.User.destroy({
                    where: { email: userEmail },
                });
                resolve({
                    errCode: 0,
                    errMessage: `The user is deleted`,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserData = async (data) => {
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
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phone = data.phone;
                user.birthday = data.birthday;
                user.avatar = data.avatar;
                user.password = data.password;
                await user.save();
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address,
                //     phone: data.phone,
                //     birthday: data.birthday,
                // });
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
let getAllCodeService = (typeInput) => {
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
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllCodeService: getAllCodeService,
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
};
