import userService from '../services/userService';

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
module.exports = {
    handleLogin: handleLogin,
    getAllCode: getAllCode,
};
