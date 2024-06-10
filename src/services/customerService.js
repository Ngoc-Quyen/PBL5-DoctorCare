import db from '../models';
import removeMd from 'remove-markdown';
import syncElastic from './syncsElaticService';
import helper from '../helper/client';
import { reject, resolve } from 'bluebird';
import { where } from 'sequelize';

let getAllcustomers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let customers = await db.User.findAll({
                where: { roleId: 3 },
                raw: true,
            });

            resolve(customers);
        } catch (e) {
            reject(e);
        }
    });
};
let getCustomerByPhone = async (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customers = await db.User.findAll({
                where: {
                    roleId: 3,
                    phone: phone,
                },
                raw: true,
            });
            resolve(customers);
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    getAllcustomers: getAllcustomers,
    getCustomerByPhone: getCustomerByPhone,
};
