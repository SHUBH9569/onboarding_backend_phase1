import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import { sequelize } from './models/index.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });


  await sequelize.authenticate();
  console.log(" Postgres connected");

  await sequelize.sync();
   
  await mongoose.connect(process.env.MONGO_URI);
  console.log(" MongoDB connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server ready at http://localhost:4000/graphql`);
  });
}

startServer();