import db from "./../models";
import moment from "moment";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let maxBooking = 5;
let getDetailClinicPage = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: id },
                attributes: [ 'id', 'name', 'image', 'introductionHTML', 'description' ],
            });

            if(!clinic){
                reject(`Can't get clinic with id = ${id}`);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createNewClinic = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.create(item);
            resolve(clinic);
        } catch (e) {
            reject(e);
        }
    });
};

let deleteClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Clinic.destroy({
                where: { id: id }
            });

            let clinic = await db.Doctor_User.findAll({
                where: {
                    clinicId: id
                }
            });
            let arrId = [];
            clinic.map((x) => {
                arrId.push(x.id);
            });
            await db.Doctor_User.destroy({ where: { id: arrId } });

            resolve('delete successful')
        } catch (e) {
            reject(e);
        }
    });
};

let getClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: id },
            });
            resolve(clinic);
        } catch (e) {
            reject(e);
        }
    });
};

let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: data.id }
            });
            await clinic.update(data);
            resolve(true)
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getDetailClinicPage: getDetailClinicPage,
    getClinicById: getClinicById,
    createNewClinic: createNewClinic,
    deleteClinicById: deleteClinicById,
    updateClinic: updateClinic
};