'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    History.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true, // Mark id as primary key
            },
            pateintId: DataTypes.STRING,
            doctorId: DataTypes.STRING,
            decription: DataTypes.TEXT,
            file: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'History',
        }
    );
    return History;
};
