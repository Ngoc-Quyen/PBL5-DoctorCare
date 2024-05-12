require('dotenv').config();
import postService from '../services/postService';
import patientService from '../services/patientService';
import homeService from './../services/homeService';
import userService from './../services/userService';
import specializationService from './../services/specializationService';
import customerService from '../services/customerService';
import doctorService from './../services/doctorService';
import chatFBServie from './../services/chatFBService';
import multer from 'multer';

const statusNewId = 4;
const statusPendingId = 3;
const statusFailedId = 2;
const statusSuccessId = 1;

let getManageDoctor = async (req, res) => {
    let doctors = await userService.getInfoDoctors();
    return res.render('main/users/admins/manageDoctor.ejs', {
        user: req.user,
        doctors: doctors,
    });
};
let getManageUser = async (req, res) => {};

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
        address: req.body.address,
        avatar: 'doctor.jpg',
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
            id: req.body.id,
            name: req.body.nameDoctor,
            phone: req.body.phoneDoctor,
            address: req.body.addressDoctor,
            description: req.body.introEditDoctor,
            specializationId: req.body.specializationDoctor,
        };
        await doctorService.updateDoctorInfo(item);
        return res.status(200).json({
            message: 'update info doctor successful',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
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
    let customers = await customerService.getAllcustomers();
    return res.render('main/users/admins/manageCustomer.ejs', {
        user: req.user,
        customers: customers,
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
            writerId: req.user.id,
            contentMarkdown: req.body.contentMarkdown,
            contentHTML: req.body.contentHTML,
            updatedAt: Date.now(),
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
    //render data = js/ getForPatientsTabs
    return res.render('main/users/admins/manageBooking.ejs', {
        user: req.user,
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
        let role = '';
        if (req.user) {
            if (req.user.roleId === 1) role = 'admin';
        }
        let object = await postService.getPostsPagination(1, +process.env.LIMIT_GET_POST, role);
        return res.render('main/users/admins/managePost.ejs', {
            user: req.user,
            posts: object.posts,
            total: object.total,
        });
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
        let object = await patientService.getForPatientsTabs();
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

        let patient = await patientService.changeStatusPatient(data, logs);
        return res.status(200).json({
            message: 'success',
            patient: patient,
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
    postDoneComment: postDoneComment
};
