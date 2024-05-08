const specialtyService = require('../services/specialtyService');

let handleGetAllSpecialty = async (req, res) => {
    let data = await specialtyService.getAllSpecialty();
    if (!data) {
        res.status(200).json({
            errCode: 1,
            errMessage: 'Chua co chuyen khoa trong du lieu',
        });
    } else {
        res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            data,
        });
    }
};
let handleCreateSpecialty = async (req, res) => {
    let message = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(message);
};
let handleEditSpecialty = async (req, res) => {
    let data = req.body;
    const file = req.file; // Lấy thông tin về file ảnh từ request
    let message = await specialtyService.updateSpecialtyData(data, file);
    return res.status(200).json(message);
};
let handleDeleteSpecialty = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missinf required parameters!',
        });
    }
    let message = await specialtyService.deleteSpecialty(req.body.id);
    return res.status(200).json(message);
};
module.exports = {
    handleGetAllSpecialty: handleGetAllSpecialty,
    handleCreateSpecialty: handleCreateSpecialty,
    handleEditSpecialty: handleEditSpecialty,
    handleDeleteSpecialty: handleDeleteSpecialty,
};
