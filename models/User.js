import Connection from './connection.js';
import { DataTypes } from 'sequelize';

const User = Connection.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'data',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export default User;
