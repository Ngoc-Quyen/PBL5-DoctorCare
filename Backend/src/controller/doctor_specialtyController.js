import doctor_specialtyService from '../services/doctor_specialtyService';
let handleCreateDoctorSpecialty = async (req, res) => {
    let doctor = await doctor_specialtyService.getDoctorbyEmailSpecialty(req.body);
    if (doctor.errCode === 0) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Bac si nay da co trong chuyen khoa nay',
        });
    } else {
        let message = await doctor_specialtyService.createDoctorSpecialty(req.body);
        return res.status(200).json(message);
    }
};
let handleGetAllDoctorSpecialty = async (req, res) => {
    let message = await doctor_specialtyService.getAllDoctorSpecialty();
    return res.status(200).json(message);
};
let handleDeleteDoctorSpecialty = async (req, res) => {
    let message = await doctor_specialtyService.deleteDoctorSpecialty(req.body);
    return res.status(200).json(message);
};
let handleEditDoctorSpecialty = async (req, res) => {
    let message = await doctor_specialtyService.updateDoctorSpecialty(req.body);
    return res.status(200).json(message);
};
module.exports = {
    handleCreateDoctorSpecialty: handleCreateDoctorSpecialty,
    handleGetAllDoctorSpecialty: handleGetAllDoctorSpecialty,
    handleDeleteDoctorSpecialty: handleDeleteDoctorSpecialty,
    handleEditDoctorSpecialty: handleEditDoctorSpecialty,
};
