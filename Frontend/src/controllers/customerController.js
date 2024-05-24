require('dotenv').config();
import homeService from '../services/homeService';
import userService from '../services/userService';
import postService from '../services/postService';
import patientService from '../services/patientService';
import doctorService from './../services/doctorService';



const statusNewId = 4;
const statusPendingId = 3;
const statusFailedId = 2;
const statusSuccessId = 1;

let getManageCustomersPage = async(req, res) => {
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
let getInforCustomerById = async(req, res) => {
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
let deleteCustomerById = async(req, res) => {
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
let postChangeStatusPatientForUser = async(req, res) => {
    try {
        let id = req.body.patientId;
        let status = req.body.status;
        let historyBreath = req.body.historyBreath;
        let moreInfo = req.body.moreInfo;
        let statusId = '';
        let content = '';
        if (status === 'pending') {
            statusId = statusPendingId;
            content = 'New appointments have been received';
        } else if (status === 'failed') {
            statusId = statusFailedId;
            if (req.body.reason) {
                content = `Cancel with reason - ${req.body.reason}`;
            }
        } else if (status === 'confirmed') {
            statusId = statusSuccessId;
            content = 'The appointment has been successfully booked';
        }

        let data = {
            id: id,
            statusId: statusId,
            updatedAt: Date.now(),
        };

        let logs = {
            adminId: req.user.id,
            patientId: id,
            content: content,
        };

        let patient = await patientService.changeStatusPatientForUser(data, logs);
        let extrainfor = await patientService.updateExtrainfos(id, historyBreath, moreInfo);
        return res.status(200).json({
            message: 'success',
            patient: patient,
            extrainfos: extrainfor,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getPageInfoUser = async(req, res) => {
    try {
        return res.render('main/homepage/InfoUser.ejs', {
            user: req.user,
            formatDate: formatDate // Truyền hàm formatDate vào view
        });
    } catch (e) {
        console.log(e);
    }
};
let getForPatientForUser = async(req, res) => {
    try {
        let idUser = req.user.id;
        let object = await patientService.getForPatientForUser(idUser);
        return res.status(200).json({
            message: 'success',
            object: object,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

const formatDate = (date) => {
    let parts = date.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // Định dạng dd/mm/yyyy
};
let getInfoBooking = async(req, res) => {
    try {
        let logs = await patientService.getInfoBooking(req.body.patientId);
        return res.status(200).json(logs);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};
let getLogsPatient = async(req, res) => {
    try {
        let logs = await patientService.getLogsPatient(req.body.patientId);
        return res.status(200).json(logs);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};
module.exports = {
    getManageCustomersPage: getManageCustomersPage,
    getInforCustomerById: getInforCustomerById,
    postChangeStatusPatientForUser: postChangeStatusPatientForUser,
    deleteCustomerById: deleteCustomerById,
    getPageInfoUser: getPageInfoUser,
    getForPatientForUser: getForPatientForUser,
    getInfoBooking: getInfoBooking,
    getLogsPatient: getLogsPatient
};