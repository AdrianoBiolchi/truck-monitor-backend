const { Model, Sequelize } = require('sequelize')


module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Company.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        ie: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        status: {
          type: DataTypes.ENUM('active', 'inactive'),
          defaultValue: 'active',
        },

      }, {
        sequelize,
        paranoid:true,
        modelName: 'Company',
      });
      return Company;
    };