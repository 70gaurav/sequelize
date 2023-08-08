import { Sequelize } from 'sequelize';

const Connection = new Sequelize('users', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default Connection;
