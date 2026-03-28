import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Author = sequelize.define('Author',{
    name: DataTypes.STRING,
    biography : DataTypes.TEXT,
    born_date : DataTypes.DATE
});