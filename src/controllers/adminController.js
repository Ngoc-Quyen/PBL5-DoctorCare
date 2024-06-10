require('dotenv').config();
import postService from '../services/postService';
import patientService from '../services/patientService';
import homeService from './../services/homeService';
import userService from './../services/userService';
import specializationService from './../services/specializationService';
import customerService from '../services/customerService';
import doctorService from './../services/doctorService';
import chatFBServie from './../services/chatFBService';
import uploadImg from '../services/imgLoadFirebase';
import multer from 'multer';
import moment from 'moment';

const statusNewId = 4;
const statusPendingId = 3;
const statusFailedId = 2;
const statusSuccessId = 1;

let getManageDoctor = async (req, res) => {
    let doctors = await userService.getInfoDoctors();
    let specializations = await homeService.getSpecializations();
    return res.render('main/users/admins/manageDoctor.ejs', {
        user: req.user,
        doctors: doctors,
        specializations: specializations,
    });
};

let getCreateDoctor = async (req, res) => {
    let specializations = await homeService.getSpecializations();
    return res.render('main/users/admins/createDoctor.ejs', {
        user: req.user,
        specializations: specializations,
    });
};
let postCreateDoctor = async (req, res) => {
    let doctor = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        specializationId: req.body.specialization,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.address,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/pbl5-a1f37.appspot.com/o/images%2FavatarUsers%2FavatarDoctor%2Fdoctor.jpg?alt=media&token=2cdf2069-2bf9-4a02-afff-ccbb33dd7402',
        description: req.body.description,
    };
    try {
        await userService.createDoctor(doctor);
        return res.status(200).json({ message: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};
let getCreatePatient = async (req, res) => {
    let specializations = await homeService.getSpecializations();
    return res.render('main/users/admins/createPatient.ejs', {
        user: req.user,
        specializations: specializations,
    });
};

let getSpecializationPage = async (req, res) => {
    let specializations = await specializationService.getAllSpecializations();
    return res.render('main/users/admins/manageSpecialization.ejs', {
        user: req.user,
        specializations: specializations,
    });
};

let deleteDoctorById = async (req, res) => {
    try {
        let doctor = await doctorService.deleteDoctorById(req.body.id);
        return res.status(200).json({
            message: 'success',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getEditDoctor = async (req, res) => {
    let doctor = await doctorService.getDoctorForEditPage(req.params.id);
    let specializations = await homeService.getSpecializations();
    return res.render('main/users/admins/editDoctor.ejs', {
        user: req.user,
        doctor: doctor,
        specializations: specializations,
    });
};

let putUpdateDoctorWithoutFile = async (req, res) => {
    try {
        let item = {
            id: req.body.idDoctor,
            name: req.body.nameDoctor,
            phone: req.body.phoneDoctor,
            address: req.body.addressDoctor,
            description: req.body.introEditDoctor,
            specializationId: req.body.specializationDoctor,
        };
        let mess = await doctorService.updateDoctorInfo(item);
        if (mess.errCode === 0) {
            return res.status(200).json(mess);
            // return res.redirect('/users/manage/doctor');
        } else {
            return res.status(200).json(mess);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};
let postEditDoctor = async (req, res) => {
    try {
        let file = req.file;
        let imgUrl = '';
        if (file) {
            imgUrl = await uploadImg.uploadImg(file);
        }
        let data = {
            id: req.body.idDoctor,
            name: req.body.nameDoctor,
            phone: req.body.phoneDoctor,
            address: req.body.addressDoctor,
            description: req.body.introEditDoctor,
            specializationId: req.body.specializationDoctor,
            avatar: imgUrl,
        };
        // let patient = await doctorService.getPatientForEditPage(req.params.id);
        // let specializations = await homeService.getSpecializations();
        let mess = await doctorService.updateProfile(data);
        if (mess.errCode === 0) {
            return res.status(200).json(mess);
            // return res.redirect('/users/manage/customer');
        } else {
            return res.status(200).json(mess);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

let putUpdateDoctor = (req, res) => {
    imageDoctorUploadFile(req, res, async (err) => {
        if (err) {
            if (err.message) {
                return res.status(500).send(err.message);
            } else {
                return res.status(500).send(err);
            }
        }

        try {
            let item = {
                id: req.body.id,
                name: req.body.nameDoctor,
                phone: req.body.phoneDoctor,
                address: req.body.addressDoctor,
                description: req.body.introEditDoctor,
                specializationId: req.body.specializationDoctor,
            };
            let imageDoctor = req.file;
            item.avatar = imageDoctor.filename;
            let doctor = await doctorService.updateDoctorInfo(item);
            return res.status(200).json({
                message: 'update doctor info successful',
                doctor: doctor,
            });
        } catch (e) {
            return res.status(500).send(e);
        }
    });
};

let storageImageDoctor = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/public/images/users');
    },
    filename: (req, file, callback) => {
        let imageName = `${Date.now()}-${file.originalname}`;
        callback(null, imageName);
    },
});

let imageDoctorUploadFile = multer({
    storage: storageImageDoctor,
    limits: { fileSize: 1048576 * 20 },
}).single('avatar');

let getCustomerPage = async (req, res) => {
    let phone = req.body.phone;
    let customers = '';
    if (!phone) {
        customers = await customerService.getAllcustomers();
    } else {
        customers = await customerService.getUserByPhone(phone);
    }

    return res.render('main/users/admins/manageCustomer.ejs', {
        user: req.user,
        customers: customers,
        phone: phone,
    });
};

let deleteSpecializationById = async (req, res) => {
    try {
        await specializationService.deleteSpecializationById(req.body.id);
        return res.status(200).json({
            message: 'delete specialization successful',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getManageBotPage = async (req, res) => {
    try {
        return res.send("Hello word. You'll need a witAI account. More info: please comment on my youtube channel.");
        // let entities = await chatFBServie.getWitEntitiesWithExpression();
        // let entityName = await chatFBServie.getWitEntities();
        // return res.render('main/users/admins/manageBot.ejs', {
        //     user: req.user,
        //     entities: entities,
        //     entityName: entityName
        // });
    } catch (e) {
        console.log(e);
    }
};

let deletePostById = async (req, res) => {
    try {
        await postService.deletePostById(req.body.id);
        return res.status(200).json({
            message: 'delete post successful',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getEditPost = async (req, res) => {
    try {
        let doctors = await userService.getInfoDoctors();
        let specializations = await homeService.getSpecializations();
        let post = await postService.getDetailPostPage(req.params.id);
        return res.render('main/users/admins/editPost.ejs', {
            doctors: doctors,
            specializations: specializations,
            user: req.user,
            post: post,
        });
    } catch (e) {
        console.log(e);
    }
};

let putUpdatePost = async (req, res) => {
    try {
        let data = {
            id: req.body.id,
            title: req.body.titlePost,
            forDoctorId: req.body.forDoctorId,
            forSpecializationId: req.body.forSpecializationId,
            // writerId: req.user.id,
            contentMarkdown: req.body.contentMarkdown,
            contentHTML: req.body.contentHTML,
            updatedAt: Date.now(),
            isActive: req.body.isActive,
        };

        await postService.putUpdatePost(data);
        return res.status(200).json({
            message: 'update post successful',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getManageCreateScheduleForDoctorsPage = async (req, res) => {
    try {
        return res.render('main/users/admins/manageScheduleForDoctors.ejs', {
            user: req.user,
        });
    } catch (e) {
        console.log(e);
    }
};
let getNewPatients = (req, res) => {
    let currentDate = moment().format('DD/MM/YYYY');
    let date = '';
    let canActive = false;
    if (req.query.dateDoctorAppointment) {
        date = req.query.dateDoctorAppointment;
        if (date === currentDate) canActive = true;
    } else {
        //get currentDate
        date = currentDate;
        canActive = true;
    }
    return res.render('main/users/admins/manageBooking.ejs', {
        user: req.user,
        date: date,
    });
};

let getAllPosts = async (req, res) => {
    try {
        let posts = await postService.getAllPosts();
        return res.status(200).json({ data: posts });
    } catch (e) {
        return res.status(500).json(e);
    }
};
let getPostByWriteId = async (req, res) => {
    try {
        let posts = await postService.getPostByWriteId(req.user.id);
        return res.status(200).json({ data: posts });
        return;
    } catch (error) {
        return res.status(500).json(error);
    }
};
let getCreatePost = async (req, res) => {
    let doctors = await userService.getInfoDoctors();
    let specializations = await homeService.getSpecializations();
    return res.render('main/users/admins/createPost.ejs', {
        user: req.user,
        doctors: doctors,
        specializations: specializations,
    });
};

let postCreatePost = async (req, res) => {
    try {
        let item = req.body;
        item.writerId = req.user.id;
        item.createdAt = Date.now();
        item.isActive = 0;
        let post = await postService.postCreatePost(item);
        return res.status(200).json({
            status: 1,
            message: post,
        });
    } catch (e) {
        return res.status(500).json(e);
    }
};

let getManagePosts = async (req, res) => {
    try {
        let role = {};
        let object = {};
        if (req.user) {
            if (req.user.roleId === 1) {
                role = {
                    roleName: 'admin',
                    userId: req.user.id,
                };
                object = await postService.getPostsPagination(1, +process.env.LIMIT_GET_POST, role);
                return res.render('main/users/admins/managePost.ejs', {
                    user: req.user,
                    posts: object.posts,
                    total: object.total,
                });
            }
            if (req.user.roleId === 2) {
                role = {
                    roleName: 'doctor',
                    userId: req.user.id,
                };
                object = await postService.getPostsPagination(1, +process.env.LIMIT_GET_POST, role);
                return res.render('main/users/admins/managePostByDoctor.ejs', {
                    user: req.user,
                    posts: object.posts,
                    total: object.total,
                });
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getPostsPagination = async (req, res) => {
    try {
        let page = +req.query.page;
        let limit = +process.env.LIMIT_GET_POST;
        if (!page) {
            page = 1;
        }
        let object = await postService.getPostsPagination(page, limit);
        return res.status(200).json(object);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getForPatientsTabs = async (req, res) => {
    try {
        let currentDate = moment().format('DD/MM/YYYY');
        let date = '';
        let canActive = false;
        if (req.query.dateDoctorAppointment) {
            date = req.query.dateDoctorAppointment;
            if (date === currentDate) canActive = true;
        } else {
            //get currentDate
            date = currentDate;
            canActive = true;
        }
        let idDoctor = req.user.id;
        let object = await patientService.getForPatientsTabs(idDoctor);
        return res.status(200).json({
            message: 'success',
            object: object,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};
let getForPatientsByDateTabs = async (req, res) => {
    try {
        let currentDate = moment().format('DD/MM/YYYY');
        let canActive = false;
        let date = '';
        if (req.body.dateSearch) {
            date = req.body.dateSearch;
            if (date === currentDate) canActive = true;
        } else {
            //get currentDate
            date = currentDate;
            canActive = true;
        }

        let idDoctor = req.user.id;
        let object = await patientService.getForPatientsByDateTabs(idDoctor, date);
        return res.status(200).json({
            message: 'success',
            object: object,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let postChangeStatusPatient = async (req, res) => {
    try {
        let id = req.body.patientId;
        let status = req.body.status;
        let historyBreath = req.body.historyBreath;
        let moreInfo = req.body.moreInfo;
        let statusId = '';
        let content = '';
        if (status === 'pending') {
            statusId = statusPendingId;
            content = 'Đã nhận lịch hẹn mới';
        } else if (status === 'failed') {
            statusId = statusFailedId;
            if (req.body.reason) {
                content = `${req.body.reason}`;
            }
        } else if (status === 'confirmed') {
            statusId = statusSuccessId;
            content = 'Lịch hẹn đã khám thành công';
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

        let patient = await patientService.changeStatusPatient(data, logs, historyBreath, moreInfo);
        let extrainfor = await patientService.updateExtrainfos(id, historyBreath, moreInfo);

        return res.status(200).json({
            message: 'success',
            patient: patient,
            // extrainfos: extrainfor,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let getInfoStatistical = async (req, res) => {
    try {
        let month = req.body.month;
        let object = await userService.getInfoStatistical(month);
        return res.status(200).json(object);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};
let getLogsPatient = async (req, res) => {
    try {
        let logs = await patientService.getLogsPatient(req.body.patientId);
        return res.status(200).json(logs);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let postDoneComment = async (req, res) => {
    try {
        let comment = await postService.doneComment(req.body.commentId);
        return res.status(200).json(comment);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};
let postCreatePatient = async (req, res) => {
    let patient = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        address: req.body.address,
        avatar: req.user.avatar,
        description: req.body.description,
    };
    try {
        let mess = await userService.createNewUser(patient);
        console.log(mess.errMessage);
        if (mess.errCode === 0) {
            return res.redirect('/users/manage/customer');
        } else {
            return res.redirect('users/manage/customer/create');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};
let getEditPatient = async (req, res) => {
    let patient = await doctorService.getPatientForEditPage(req.params.id);
    let specializations = await homeService.getSpecializations();
    return res.render('main/users/admins/editCustomer.ejs', {
        user: req.user,
        doctor: patient,
        specializations: specializations,
    });
};
let postEditPatient = async (req, res) => {
    try {
        let file = req.file;
        let imgUrl = '';
        if (file) {
            imgUrl = await uploadImg.uploadImg(file);
        }
        let data = {
            id: req.body.idDoctor,
            name: req.body.nameDoctor,
            phone: req.body.phoneDoctor,
            gender: req.body.gender,
            address: req.body.addressDoctor,
            description: req.body.introEditDoctor,
            birthday: req.body.birthday,
            avatar: imgUrl,
        };
        let patient = await doctorService.getPatientForEditPage(req.params.id);
        let specializations = await homeService.getSpecializations();
        let mess = await userService.updateProfile(data);
        if (mess.errCode === 0) {
            return res.status(200).json(mess);
            // return res.redirect('/users/manage/customer');
        } else {
            return res.status(200).json(mess);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};
let getEditSpecialization = async (req, res) => {
    let specialty = await doctorService.getSpecializationById(req.params.id);
    let specializations = await homeService.getSpecializations();

    return res.render('main/users/admins/editSpecialization.ejs', {
        user: req.user,
        specialty: specialty,
        specializations: specializations,
    });
};
let postEditSpecialization = async (req, res) => {
    let data = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
    };
    let message = await specializationService.updateSpecializationById(data);
    if (message.errCode === 0) {
        return res.redirect('/users/manage/specialization');
    } else {
        return res.render('main/users/admins/editSpecialization.ejs', {
            user: req.user,
            specialty: specialty,
            specializations: specializations,
        });
    }
};
let getCreateSpecializationPage = async (req, res) => {
    return res.render('main/users/admins/createSpecialization.ejs', {
        user: req.user,
    });
};
let postCreateSpecialization = async (req, res) => {
    let data = {
        name: req.body.name,
        description: req.body.description,
        image: 'https://firebasestorage.googleapis.com/v0/b/pbl5-a1f37.appspot.com/o/images%2FavatarSpecialties%2F161905-iconkham-chuyen-khoa.png?alt=media&token=361652f1-f901-409d-9fdf-ca9bf2d50128',
    };
    let mess = await specializationService.createSpecialization(data);
    if (mess.errCode === 0) {
        return res.redirect('/users/manage/specialization');
    } else {
        res.redirect('/users/manage/specialization/create');
    }
};

let getUserByPhone = async (req, res) => {
    let phone = req.body.phone;
    let listUser = '';
    if (phone !== '') {
        listUser = await customerService.getCustomerByPhone(phone);
    } else {
        listUser = await customerService.getAllcustomers(phone);
    }
    return res.status(200).json(listUser);
    // return res.render('main/users/admins/manageCustomer.ejs', {
    //     user: req.user,
    //     customers: listUser.customers,
    //     phone: phone,
    // });
};
let getDoctorBy = async (req, res) => {
    try {
        let giatri = req.body.thongtin;
        let loai = req.body.selectedValue;
        let doctors = await doctorService.getInfoDoctorsByCriteria(giatri, loai);
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
let getSpecializationById = async (req, res) => {
    try {
        let speId = req.body.id;
        let object = await specializationService.getSpecializationById(speId);
        return res.status(200).json(object);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
module.exports = {
    getManageDoctor: getManageDoctor,
    getCreateDoctor: getCreateDoctor,
    getSpecializationPage: getSpecializationPage,
    getEditDoctor: getEditDoctor,
    getCustomerPage: getCustomerPage,
    getManageBotPage: getManageBotPage,
    getEditPost: getEditPost,
    getManageCreateScheduleForDoctorsPage: getManageCreateScheduleForDoctorsPage,
    getInfoStatistical: getInfoStatistical,

    postCreateDoctor: postCreateDoctor,
    putUpdateDoctorWithoutFile: putUpdateDoctorWithoutFile,
    putUpdateDoctor: putUpdateDoctor,
    putUpdatePost: putUpdatePost,

    deleteDoctorById: deleteDoctorById,
    deleteSpecializationById: deleteSpecializationById,
    deletePostById: deletePostById,

    getNewPatients: getNewPatients,
    getManagePosts: getManagePosts,
    getCreatePost: getCreatePost,
    postCreatePost: postCreatePost,
    getAllPosts: getAllPosts,
    getPostsPagination: getPostsPagination,
    getForPatientsTabs: getForPatientsTabs,
    postChangeStatusPatient: postChangeStatusPatient,
    getLogsPatient: getLogsPatient,
    postDoneComment: postDoneComment,

    getCreatePatient: getCreatePatient,
    postCreatePatient: postCreatePatient,
    getEditPatient: getEditPatient,
    postEditPatient: postEditPatient,

    getEditSpecialization: getEditSpecialization,
    postEditSpecialization: postEditSpecialization,
    getCreateSpecializationPage: getCreateSpecializationPage,
    postCreateSpecialization: postCreateSpecialization,
    getForPatientsByDateTabs: getForPatientsByDateTabs,
    getUserByPhone: getUserByPhone,

    getDoctorBy: getDoctorBy,
    getSpecializationById: getSpecializationById,

    getPostByWriteId: getPostByWriteId,
    postEditDoctor: postEditDoctor,
};
