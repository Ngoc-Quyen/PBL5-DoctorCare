'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                primaryKey: true, // Mark id as primary key
            },
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            birthday: DataTypes.DATEONLY,
            avatar: DataTypes.STRING,
            roleId: DataTypes.STRING,
            isActive: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
