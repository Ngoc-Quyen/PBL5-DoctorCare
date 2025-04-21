import db from '../models';
import removeMd from 'remove-markdown';
import syncElastic from './syncsElaticService';
import helper from '../helper/client';
import { reject, resolve } from 'bluebird';
import { where } from 'sequelize';
const { Op } = require('sequelize');
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
let getAllCustomersPaging = async (limit, offset) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { count, rows: customers } = await db.User.findAndCountAll({
                where: { roleId: 3 },
                raw: true,
                order: [['createdAt', 'ASC']],
                limit,
                offset,
            });
            let totalPages = Math.ceil(count / limit);
            resolve({ customers, totalPages });
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
                    phone: {
                        [Op.like]: `%${phone}%`,
                    },
                },
                raw: true,
                order: [['name', 'ASC']],
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
    getAllCustomersPaging: getAllCustomersPaging,
};
