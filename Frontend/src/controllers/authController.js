import { validationResult } from 'express-validator';
import auth from '../services/authService';
import user from '../services/userService';

let getLogin = (req, res) => {
    return res.render('auth/login.ejs', {
        error: req.flash('error'),
    });
};

let getRegister = (req, res) => {
    return res.render('auth/register.ejs');
};

let postRegister = async (req, res) => {
    let hasErrors = validationResult(req).array({
        onlyFirstError: true,
    });
    if (!hasErrors.length) {
        try {
            // await authService.register(req.body.name, req.body.rg_email, req.body.rg_password, req.protocol, req.get("host")).then(async (user) => {
            // console.log(user);
            // res.redirect('login');
            // let linkVerify = `${req.protocol}://${req.get("host")}/verify/${user.local.verifyToken}`;
            // await authService.register({user}, linkVerify)
            // .then((message) => {
            //     req.flash("success", message);
            //     res.redirect('/login');
            // })
            // .catch((err) => {
            //     console.log(err);
            // });
            // }).catch((err) => {
            //     console.log(err);
            // });
        } catch (err) {
            req.flash('errors', err);
            res.render('/register', {
                oldData: req.body,
            });
        }
    } else {
        let errEmail = '',
            errPassword = '',
            errPasswordConfirm = '';
        hasErrors.forEach((err) => {
            if (err.param === 'rg_email') errEmail = err.msg;
            if (err.param === 'rg_password') errPassword = err.msg;
            if (err.param === 'rg_password_again') errPasswordConfirm = err.msg;
        });
        res.render('auth/register', {
            errEmail: errEmail,
            errPassword: errPassword,
            errPasswordConfirm: errPasswordConfirm,
            hasErrors: hasErrors,
            oldData: req.body,
        });
    }
};

let verifyAccount = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    try {
        let verifySuccess = await auth.verifyAccount(req.params.token);
        successArr.push(verifySuccess);
        req.flash('success', successArr);
        return res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
};

let getLogout = (req, res) => {
    req.session.destroy(function (err) {
        console.log(err);
        return res.redirect('/login');
    });
};

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users');
    }
    next();
};

let getAllCode = async (req, res) => {
    try {
        let data = await user.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Get all code error: ', error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server',
        });
    }
};
module.exports = {
    getLogin: getLogin,
    getRegister: getRegister,
    postRegister: postRegister,
    verifyAccount: verifyAccount,
    getLogout: getLogout,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    getAllCode: getAllCode,
};
