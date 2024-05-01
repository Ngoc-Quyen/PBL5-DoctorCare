'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Places', [
            
        ], {});

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Places', null, {});
    }
};
