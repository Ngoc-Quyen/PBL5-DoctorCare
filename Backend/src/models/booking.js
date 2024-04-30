'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Booking.init(
        {
            id: DataTypes.STRING,
            pateintId: DataTypes.STRING,
            doctorId: DataTypes.STRING,
            statusId: DataTypes.STRING,
            ExamimationDate: DataTypes.DATEONLY,
            ExamimationTime: DataTypes.TIME,
            TimeBooking: DataTypes.DATE,
            timeType: DataTypes.STRING,
            packageId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Booking',
        }
    );
    return Booking;
};
