import Connection from './connection.js';
import { DataTypes } from 'sequelize';

const Employe = Connection.define('employe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  employeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  employeDob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  employeCountry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  joiningDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'employe',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export default Employe;
