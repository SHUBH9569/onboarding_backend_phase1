import dotenv from 'dotenv';
dotenv.config(); 

import { Sequelize } from 'sequelize';

console.log("POSTGRES_URI:", process.env.POSTGRES_URI); 

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});