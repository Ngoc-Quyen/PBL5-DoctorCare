require('dotenv').config();
import homeService from "../services/homeService";
import userService from "../services/userService";
import postService from "../services/postService";
import patientService from "../services/patientService";

const statusNewId = 4;
const statusPendingId = 3;
const statusFailedId = 2;
const statusSuccessId = 1;



let getManageCustomersPage = async (req, res) => {
    try {
        let comments = await patientService.getComments();
        return res.render("main/users/admins/manageCustomer.ejs", {
            user: req.user,
            comments: comments
        });
    } catch (e) {
        console.log(e)
    }
};


module.exports = {
    
    getManageCustomersPage: getManageCustomersPage
};
