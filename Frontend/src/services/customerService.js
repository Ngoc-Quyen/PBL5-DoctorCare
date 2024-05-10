import db from "../models";
import removeMd from "remove-markdown";
import syncElastic from "./syncsElaticService";
import helper from "../helper/client";

let getAllcustomers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let customers = await db.User.findAll({
                where: { roleId: 3 }
            });

            resolve(customers);

        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getAllcustomers: getAllcustomers
};

