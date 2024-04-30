'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specilty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Specilty.init(
        {
            id: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Specilty',
        }
    );
    return Specilty;
};
