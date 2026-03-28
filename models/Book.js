import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import {Author} from "./Author.js"


export const Book = sequelize.define('Book',{
    title : DataTypes.STRING,
    description: DataTypes.TEXT,
    published_date : DataTypes.DATE
});

Book.belongsTo(Author,{foreignKey: 'author_id'});
Author.hasMany(Book,{foreignKey: 'author_id'});
