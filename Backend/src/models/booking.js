'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            // define association here
        }
    }

    Booking.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            patientId: {
                type: DataTypes.STRING,
            },
            doctorId: {
                type: DataTypes.STRING,
            },
            statusId: {
                type: DataTypes.STRING,
            },
            ExaminationDate: {
                type: DataTypes.DATEONLY,
            },
            ExaminationTime: {
                type: DataTypes.TIME,
            },
            TimeBooking: {
                type: DataTypes.DATE,
            },
            timeType: {
                type: DataTypes.STRING,
            },
            packageId: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Booking',
        }
    );

    return Booking;
};
