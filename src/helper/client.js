import db from "./../models";
import moment from "moment";

let getSpecializationById = (id) => {
    return new Promise(async (resolve, reject) => {
            try {
                let specialization = await db.Specialization.findOne({ where: { id: id } });
                resolve(specialization);
            } catch (e) {
                reject(e);
            }
        }
    );
};

let getcustomerById = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                attributes: [ 'id', 'name', 'avatar' ]
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    }));
};

let convertDateClient = (date) => {
    return moment(date).format('DD-MM-YYYY');
};

module.exports = {
    getSpecializationById: getSpecializationById,
    getcustomerById: getcustomerById,
    convertDateClient: convertDateClient
};