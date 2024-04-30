'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorSpecialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    DoctorSpecialty.init(
        {
            doctorId: DataTypes.STRING,
            specialtyId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'DoctorSpecialty',
        }
    );
    return DoctorSpecialty;
};
