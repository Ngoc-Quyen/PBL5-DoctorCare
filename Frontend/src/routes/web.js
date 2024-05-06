import express from "express";
import home from "./../controllers/homeController";
import auth from "./../controllers/authController";
import admin from "./../controllers/adminController";
import doctor from "./../controllers/doctorController";
import bot from "./../controllers/botFBController";
import passport from "passport";
import passportLocal from 'passport-local';
import userService from "./../services/userService";

const multer = require('multer');
const upload = multer();

let router = express.Router();

let LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            await userService.findUserByEmail(email).then(async (user) => {
                if (!user) {
                    return done(null, false, req.flash("error", "Email không tồn tại"));
                }
                if (user && user.isActive === 1) {
                    let match = await userService.comparePassword(password, user);
                    if (match) {
                        return done(null, user, null)
                    } else {
                        return done(null, false, req.flash("error", "Mật khẩu không chính xác")
                        )
                    }
                }
                if (user && user.isActive === 0) {
                    return done(null, false, req.flash("error", "Tài khoản chưa được kích hoạt"));
                }
            });
        } catch (err) {
            console.log(err);
            return done(null, false, { message: err });
        }
    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

let initRoutes = (app) => {
    router.get("/all-doctors", home.getPageAllDoctors);
    router.get("/all-specializations", home.getPageAllSpecializations);
    router.get("/InfoUser", home.getPageInfoUser);
    router.get("/InfoInfoBooked", home.getPageInfoBooked);

    router.get('/webhook', bot.getWebhookFB);
    router.post('/webhook', bot.postWebhookFB);

    router.get("/set-up-bot-facebook", bot.getSetupBotFBPage);
    router.post("/set-up-bot-facebook", bot.handleSetupBotFBPage);
    router.get("/booking-online-messenger", bot.getBookingOnlineMessengerPage);
    router.post("/set-info-booking-online-messenger", bot.setInfoBookingMessenger);

    router.get('/feedback/:id', home.getFeedbackPage);
    router.post('/feedback/create', home.postCreateFeedback);

    router.get('/for-patients', home.getPageForPatients);
    router.get('/for-doctors', home.getPageForDoctors);

    router.post('/search-homepage', home.postSearchHomePage);

    router.get('/', home.getHomePage);
    router.get('/contact', home.getContactPage);
    router.get('/detail/specialization/:id', home.getDetailSpecializationPage);
    router.get('/detail/doctor/:id', home.getDetailDoctorPage);

    router.post('/booking-doctor-without-files/create', home.postBookingDoctorPageWithoutFiles);
    router.post('/booking-doctor-normal/create', home.postBookingDoctorPageNormal);

    router.get('/detail/post/:id', home.getDetailPostPage);
    router.get('/booking-info/:id', home.getInfoBookingPage);

    router.get('/all-posts', home.getPostsWithPagination);
    router.get('/posts/search/', home.getPostSearch);

    router.get('/users/manage/specialization', auth.checkLoggedIn, admin.getSpecializationPage);
    router.get('/users/manage/user', auth.checkLoggedIn, admin.getUserPage);
    router.get('/users', auth.checkLoggedIn, home.getUserPage);

    router.get('/users/manage/bot', auth.checkLoggedIn, admin.getManageBotPage);
    router.get('/users/manage/schedule-for-doctors', auth.checkLoggedIn, admin.getManageCreateScheduleForDoctorsPage);

    router.get('/users/manage/doctor', auth.checkLoggedIn, admin.getManageDoctor);
    router.get('/users/manage/doctor/create', auth.checkLoggedIn, admin.getCreateDoctor);
    router.post('/admin/doctor/create', auth.checkLoggedIn, admin.postCreateDoctor);
    router.get('/users/doctor/edit/:id', auth.checkLoggedIn, admin.getEditDoctor);
    router.put('/admin/doctor/update-without-file', auth.checkLoggedIn, admin.putUpdateDoctorWithoutFile);
    router.put('/admin/doctor/update', auth.checkLoggedIn, admin.putUpdateDoctor);

    router.get('/doctor/manage/schedule', doctor.getSchedule);
    router.get('/doctor/manage/schedule/create', auth.checkLoggedIn, doctor.getCreateSchedule);
    router.post('/doctor/manage/schedule/create', auth.checkLoggedIn, doctor.postCreateSchedule);
    router.post('/doctor/get-schedule-doctor-by-date', doctor.getScheduleDoctorByDate);
    router.get('/doctor/manage/appointment', auth.checkLoggedIn, doctor.getManageAppointment);
    router.get('/doctor/manage/chart', auth.checkLoggedIn, doctor.getManageChart);
    router.post('/doctor/manage/create-chart', auth.checkLoggedIn, doctor.postCreateChart);
    router.post('/doctor/send-forms-to-patient', auth.checkLoggedIn, doctor.postSendFormsToPatient);
    router.post('/doctor/auto-create-all-doctors-schedule', auth.checkLoggedIn, doctor.postAutoCreateAllDoctorsSchedule)

    router.get('/admin/manage/customers', auth.checkLoggedIn, admin.getManageCustomersPage);
    router.get('/admin/get-new-patients', auth.checkLoggedIn, admin.getNewPatients);
    router.get('/admin/manage/posts', auth.checkLoggedIn, admin.getManagePosts);
    router.get('/admin/pagination/posts', admin.getPostsPagination);
    router.get('/admin/post/edit/:id', auth.checkLoggedIn, admin.getEditPost);
    router.put('/admin/post/update', auth.checkLoggedIn, admin.putUpdatePost);
    router.get('/admin/manage/post/create', auth.checkLoggedIn, admin.getCreatePost);
    router.post('/admin/manage/post/create', auth.checkLoggedIn, admin.postCreatePost);
    router.get('/admin/get-list-posts', auth.checkLoggedIn, admin.getAllPosts);
    router.post('/admin/get-patients-for-tabs', auth.checkLoggedIn, admin.getForPatientsTabs);
    router.post('/admin/change-status-patient', auth.checkLoggedIn, admin.postChangeStatusPatient);
    router.post('/admin/get-logs-patient', auth.checkLoggedIn, admin.getLogsPatient);
    router.post('/admin/done-comment', auth.checkLoggedIn, admin.postDoneComment);

    router.post('/api/get-info-doctor-by-id', doctor.getInfoDoctorById);
    router.post('/api/get-detail-patient-by-id', home.getDetailPatientBooking);

    router.delete('/admin/delete/doctor', auth.checkLoggedIn, admin.deleteDoctorById);
    router.delete('/admin/delete/specialization', auth.checkLoggedIn, admin.deleteSpecializationById);
    router.delete('/admin/delete/post', auth.checkLoggedIn, admin.deletePostById);

    router.get("/login", auth.checkLoggedOut, auth.getLogin);

    router.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            // Redirect if it fails
            if (!user) {
                return res.redirect('/login');
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                req.session.save(() => {
                    // Redirect if it succeeds
                    return res.redirect('/users');
                });

            });
        })(req, res, next);
    });

    router.get('/register', auth.getRegister);
    router.post("/register",  auth.postRegister);
    // router.get("/verify/:token", auth.verifyAccount);

    router.get("/logout", auth.checkLoggedIn, auth.getLogout);

    router.post("/admin/statistical", auth.checkLoggedIn, admin.getInfoStatistical);

    return app.use("/", router);
};
module.exports = initRoutes;
