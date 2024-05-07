import express from 'express';
import homeController from '../controller/homeController';
import userController from '../controller/userController';

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

    router.get('/login', userController.getLoginPage);
    router.post('/api/login', userController.handleLogin);
    router.post('/login', userController.postLogin);
    router.get('/register', userController.getRegisterPage);
    router.post('/create-user', userController.postRegister);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/allcode', userController.getAllCode);
    return app.use('/', router);
};

module.exports = initWebRouters;
