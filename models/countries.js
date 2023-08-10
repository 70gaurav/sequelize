import Connection from "./connection.js";
import { DataTypes } from "sequelize";

const Countries = Connection.define("Coutries" ,{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      countryName: {
        type: DataTypes.STRING,
        allowNull: false,
      }

},{
    tableName: 'countries',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }); 

  export default Countries