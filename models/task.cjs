'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'title is required' } }
  },
  dueDate: DataTypes.DATE,
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};