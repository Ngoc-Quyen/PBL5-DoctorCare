'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('booking', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            pateintId: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.STRING,
            },
            statusId: {
                type: Sequelize.STRING,
            },
            ExamimationDate: {
                type: Sequelize.DATEONLY,
            },
            ExamimationTime: {
                type: Sequelize.TIME,
            },
            TimeBooking: {
                type: Sequelize.DATE,
            },
            timeType: {
                type: Sequelize.STRING,
            },
            packageId: {
                type: Sequelize.DATEONLY,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('booking');
    },
};
