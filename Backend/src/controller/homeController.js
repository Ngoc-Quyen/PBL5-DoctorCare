import db from '../models/index';
import CRUDService from '../services/CRUDService';
import userService from '../services/userService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('./main/homepage/homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
};

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};
// function create User
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data,
        raw: true,
    });
};
// function Select All User
let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render('displayCRUD', {
        dataTable: data,
        raw: true,
    });
};
// function edit user
let getEditCRUD = async (req, res) => {
    let userEmail = req.query.email;
    if (userEmail) {
        let userData = await CRUDService.getUserByEmail(userEmail);
        // Check user data not found

        console.log(userData);
        return res.render('editCRUD.ejs', {
            user: userData,
        });
    } else {
        return res.send('Users not found!');
    }
    console.log(req.query.email);
};
let putCRUD = async (req, res) => {
    let data = req.body;
    console.log(data);
    try {
        let result = await userService.updateUserData(data);
        if (result.errCode === 0) {
            return res.redirect('/get-crud');
        } else {
            return res.status(200).json({
                errorCode: result.errCode,
                errorMessage: result.errMessage,
            });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(200).json({
            errorCode: -1,
            errorMessage: 'Internal Server Error',
        });
    }
};
let deleteCRUD = async (req, res) => {
    let email = req.query.email;
    if (email) {
        await CRUDService.deteleUserByEmail(email);
        let data = await CRUDService.getAllUser();
        return res.render('displayCRUD.ejs', {
            dataTable: data,
            raw: true,
        });
    } else {
        return res.send('User not found!!');
    }
};
let getUserPage = async (req, res) => {
    let currentMonth = new Date().getMonth() + 1;
    console.log('getUserPage: ', req.user.user);
    res.render('main/users/home.ejs', {
        user: req.user.user,
        currentMonth: currentMonth,
    });
};
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    getUserPage: getUserPage,
};
