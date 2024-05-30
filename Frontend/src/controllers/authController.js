import { validationResult } from 'express-validator';
import auth from '../services/authService';
import user from '../services/userService';
import mailer from './../config/mailer';
import { mailChangePass } from '../../lang/en';
import apiAuth from '../middlewares/apiAuth';
import uploadImg from '../services/imgLoadFirebase';

let getLogin = (req, res) => {
    return res.render('auth/login.ejs', {
        error: req.flash('error'),
    });
};

let getRegister = (req, res) => {
    return res.render('auth/register.ejs');
};

let postRegister = async (req, res) => {
    let customer = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        address: req.body.address,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/pbl5-a1f37.appspot.com/o/images%2FavatarUsers%2FavatarPatient%2Favatar-default.png?alt=media&token=f8cd9a9f-d234-4b99-b742-77cf25ca86dd',
        description: req.body.description,
    };
    try {
        let mess = await user.createNewUser(customer);
        console.log(mess.errMessage);
        if (mess.errCode === 0) {
            return res.redirect('/login');
        } else {
            return res.redirect('/register');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
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
let getResetPasswordPage = async (req, res) => {
    let emailUser = req.query.emailResetPassword;
    console.log(emailUser);
    if (!emailUser) {
        return res.redirect('/login');
    }
    let account = await user.findUserByEmail(emailUser);

    if (account) {
        // Nếu có người dùng được tìm thấy, chuyển hướng đến trang reset password
        // return res.render('auth/reset-password.ejs');
        let otp = apiAuth.generateOtp();
        let dataSend = {
            name: account.name,
            otp: otp,
        };
        await mailer.sendEmailNormal(emailUser, mailChangePass.subject, mailChangePass.template(dataSend));
        return res.render('auth/reset-password.ejs', {
            user: account,
            showOtpInput: true, // Hiển thị ô nhập mã OTP
            otp: otp,
        });
    } else {
        // Nếu không có người dùng, ở lại trang hiện tại và đưa ra thông báo lỗi
        return res.redirect('/login');
    }
};
let postNewPassword = async (req, res) => {
    let data = req.body;
    let message = await user.updateUser(data);
    if (message.errCode === 0) {
        // thong bao update thanh cong -> chuyen den trang login
        return res.redirect('/login');
    } else {
        // thong bao chua cap nhat duoc -> o lai trang va thong bao loi
        return res.redirect('/reset-password');
    }
};
let handleEditSpecialty = async (req, res) => {
    let data = req.body;
    let file = req.file;
    let imgUrl = '';
    if (file) {
        imgUrl = await uploadImg.uploadImg(file);
    }
    let message = await user.updateUserDataFile(data, imgUrl);
    if (message.errCode === 0) {
        return res.redirect('/users');
        // Hiển thị thông báo cập nhật thành công
    } else {
        console.log('message: ', message.errMessage);
        return res.redirect('/users');
        // Hien thi thong bao chưa cập nhật được
    }
};
let sendOTPBack = async (req, res) => {
    let emailUser = req.query.emailResetPassword;
    let account = await user.findUserByEmail(emailUser);
    let otp = apiAuth.generateOtp();
    let dataSend = {
        name: account.name,
        otp: otp,
    };
    await mailer.sendEmailNormal(emailUser, mailChangePass.subject, mailChangePass.template(dataSend));
    return res.render('auth/reset-password.ejs', {
        user: account,
        showOtpInput: true, // Hiển thị ô nhập mã OTP
        otp: otp,
    });
};
let postSendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a new OTP
        const otp = apiAuth.generateOtp();

        // Send the OTP email
        await mailer.sendEmailNormal(email, mailChangePass.subject, mailChangePass.template({ otp }));

        res.status(200).send('OTP resent successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to resend OTP');
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
    getResetPasswordPage: getResetPasswordPage,
    postNewPassword: postNewPassword,
    handleEditSpecialty: handleEditSpecialty,
    postSendOTP: postSendOTP,
    sendOTPBack: sendOTPBack,
};
