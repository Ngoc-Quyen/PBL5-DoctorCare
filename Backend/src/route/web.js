import express from 'express';
import homeController from '../controller/homeController';
import userController from '../controller/userController';

import specialtyController from '../controller/specialtyController';
import doctor_specialtyController from '../controller/doctor_specialtyController';
import passport from 'passport';
import passportLocal from 'passport-local';

let router = express.Router();
let initWebRouters = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.get('/users', userController.checkLoggedIn, homeController.getUserPage);

    router.get('/login', userController.getLoginPage);
    router.post('/login', userController.postLogin);

    // });
    router.get('/register', userController.getRegisterPage);
    router.post('/create-user', userController.postRegister);
    router.get('/reset-password', userController.getRessetPassword);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    // api lay toan bo du lieu trong bang Specialty
    router.get('/api/get-all-specialty', specialtyController.handleGetAllSpecialty);
    // api tạo chuyên khoa
    router.post('/api/create-specialty', specialtyController.handleCreateSpecialty);
    // api sửa chuyên khoa
    router.put('/api/edit-specialty', specialtyController.handleEditSpecialty);
    // api xóa chuyen khoa
    router.delete('/api/delete-specialty', specialtyController.handleDeleteSpecialty);
    // api create doctor vao specialty
    router.post('/create-doctor-specialty', doctor_specialtyController.handleCreateDoctorSpecialty);
    // api get all doctor specialty
    router.get('/get-all-doctor-specialty', doctor_specialtyController.handleGetAllDoctorSpecialty);
    // api delete doctor specialty
    router.delete('/delete-doctor-specialty', doctor_specialtyController.handleDeleteDoctorSpecialty);
    // api update specialty by doctor
    router.put('/edit-doctor-specialty', doctor_specialtyController.handleEditDoctorSpecialty);
    // get allcode by type
    router.get('/allcode', userController.getAllCode);
    return app.use('/', router);
};

module.exports = initWebRouters;
