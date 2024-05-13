require('dotenv').config();
import homeService from '../services/homeService';
import userService from '../services/userService';
import postService from '../services/postService';
import patientService from '../services/patientService';

const statusNewId = 4;
const statusPendingId = 3;
const statusFailedId = 2;
const statusSuccessId = 1;

let getManageCustomersPage = async (req, res) => {
    try {
        let comments = await patientService.getComments();
        return res.render('main/users/admins/manageCustomer.ejs', {
            user: req.user,
            comments: comments,
        });
    } catch (e) {
        console.log(e);
    }
};
let getInforCustomerById = async (req, res) => {
    try {
        let idUser = req.body.id;
        let mess = await userService.getUserById(idUser);
        if (mess.errCode === 0) {
            return res.status(200).json({
                message: 'success',
                user: mess.data,
            });
        } else {
            return res.status(200).json({
                message: mess.errMessage,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
let deleteCustomerById = async (req, res) => {
    try {
        let idUser = req.body.id;
        await userService.deleteUserById(idUser);
        return res.status(200).json({
            message: 'success',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
module.exports = {
    getManageCustomersPage: getManageCustomersPage,
    getInforCustomerById: getInforCustomerById,
    deleteCustomerById: deleteCustomerById,
};
