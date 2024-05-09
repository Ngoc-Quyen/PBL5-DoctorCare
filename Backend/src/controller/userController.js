import userService from '../services/userService';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportLocal from 'passport-local';
let LocalStrategy = passportLocal.Strategy;
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                let data = await userService.getUserByEmail(email);
                let user = data.user;
                console.log(data.user);
                if (!user) {
                    return done(null, false, req.flash('error', 'Email không tồn tại'));
                } else {
                    if (user.isActive === 1) {
                        let match = await userService.comparePassword(password, user);
                        if (match) {
                            return done(null, user, null);
                        } else {
                            return done(null, false, req.flash('error', 'Mật khẩu không chính xác'));
                        }
                    } else {
                        return done(null, false, req.flash('error', 'Tài khoản chưa được kích hoạt'));
                    }
                }
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    await userService
        .getUserByEmail(email)
        .then((user) => {
            return done(null, user);
        })
        .catch((error) => {
            return done(error, null);
        });
});
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // console.log('your email: ' + email);

    // check email exist
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    // compare password
    // return userInfor
    // access_token: JWT json wweb token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Get all code error: ', error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server',
        });
    }
};
let getLoginPage = async (req, res) => {
    try {
        return res.render('auth/login.ejs', {
            error: req.flash('error'),
        });
    } catch (error) {
        console.log(error);
    }
};
let getRegisterPage = async (req, res) => {
    try {
        return res.render('auth/register.ejs');
    } catch (error) {
        console.log(error);
    }
};
let postRegister = async (req, res) => {
    try {
        let message = await userService.createNewUser(req.body);
        if (message.errCode === 0) {
            // Nếu không có lỗi, đưa ra thông báo thành công và chuyển hướng sang trang đăng nhập
            req.flash('successMessage', 'Bạn đã tạo tài khoản thành công');
            return res.redirect('/login');
        } else {
            // Nếu có lỗi, đưa ra thông báo lỗi và chuyển hướng lại trang đăng ký
            req.flash('error', message.errMessage);
            return res.redirect('/register');
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({
            errorCode: -1,
            errMessage: 'Error from Server',
        });
    }
};

let postLogin = async (req, res, next) => {
    // try {
    //     let email = req.body.email;
    //     let password = req.body.password;

    //     // Kiểm tra xem email và mật khẩu có được cung cấp không
    //     if (!email || !password) {
    //         return res.status(200).json({
    //             errCode: 1,
    //             message: 'Missing inputs parameter!',
    //         });
    //     }
    //     // Gọi hàm xử lý đăng nhập từ service
    //     let userData = await userService.handleUserLogin(email, password);
    //     // Kiểm tra kết quả đăng nhập
    //     if (userData.errCode === 0) {
    //         // Lưu thông tin người dùng vào session (nếu cần)
    //         req.session.user = userData.user;
    //         console.log(userData.user);
    //         // Chuyển hướng đến trang homePage neu la admin
    //         if (userData.user.roleId === '1') {
    //             return res.redirect('/get-crud');
    //         } else if (userData.user.roleId === '2') {
    //             return res.redirect('/users');
    //         }
    //     } else {
    //         return res.render('auth/login.ejs', {
    //             error: req.flash('error'),
    //             errCode: userData.errCode,
    //             message: userData.errMessage,
    //         });
    //     }
    // } catch (error) {
    //     console.log('Error: ', error);
    //     return res.status(500).json({
    //         errorCode: -1,
    //         errMessage: 'Error from Server',
    //     });
    // }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        // Redirect if it fails
        if (!user) {
            return res.redirect('/login');
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

            req.session.save(() => {
                // Redirect if it succeeds
                return res.redirect('/users');
            });
        });
    })(req, res, next);
};

let handleGetAllUsers = async (req, res) => {
    let email = req.query.email; // all, id
    if (!email) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: [],
        });
    }
    let users = await userService.getAllUsers(email);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users,
    });
};
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
    if (!req.body.email) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missinf required parameters!',
        });
    }
    let message = await userService.deleteUser(req.body.email);
    return res.status(200).json(message);
};
let getRessetPassword = async (req, res) => {
    let email = req.query.email;
    console.log(email);
    if (!email) {
        return res.render('auth/login.ejs', {
            error: 'Vui lòng nhập email của tài khoản!',
        });
    }
    let users = await userService.getAllUsers(email);
    if (users) {
        // Nếu có người dùng được tìm thấy, chuyển hướng đến trang reset password
        // return res.render('auth/reset-password.ejs');
        return res.render('editCRUD.ejs', {
            user: users,
        });
    } else {
        // Nếu không có người dùng, ở lại trang hiện tại và đưa ra thông báo lỗi
        return res.render('auth/login.ejs', {
            error: 'Không có tài khoản nào được tìm thấy cho email này',
        });
    }
};
let checkLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};
let checkLoggedOut = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users');
    }
    next();
};
module.exports = {
    handleLogin: handleLogin,
    getAllCode: getAllCode,
    postRegister: postRegister,
    getLoginPage: getLoginPage,
    postLogin: postLogin,
    getRegisterPage: getRegisterPage,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getRessetPassword: getRessetPassword,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
};
