import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender === '1' ? true : false,
                address: data.address,
                phone: data.phone,
                roleId: data.roleId,
            });
            resolve('ok create a new user succeed');
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
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};
let getUserByEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: data.email },
            });
            if (user) {
                // console.log(data);
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phone = data.phone;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deteleUserByEmail = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: { email: userEmail },
            });
            resolve(); // = return;
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserByEmail: getUserByEmail,
    updateUserData: updateUserData,
    deteleUserByEmail: deteleUserByEmail,
};
