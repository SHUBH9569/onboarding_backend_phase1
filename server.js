import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import { sequelize } from './models/index.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';


const allowedOrigins = [
  'http://localhost:3000', // Always allow local dev
  process.env.FRONTEND_URL  // Pull this from Render/Vercel settings
];
const app = express();
app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, 
  playground: true
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app,cors: false });


  await sequelize.authenticate();
  console.log(" Postgres connected");

  await sequelize.sync();
   
  await mongoose.connect(process.env.MONGO_URI);
  console.log(" MongoDB connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server ready`);
  });
}

startServer();