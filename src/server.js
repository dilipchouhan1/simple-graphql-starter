import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import resolverMap from './data/resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import path from 'path';
import mongoURL from '../config/db';

const schema = fs.readFileSync(path.join(__dirname, 'data/schema.graphql')).toString();

/**
 * makeExecutableSchema takes your type definitions and field resolvers and returns a GraphQLSchema
 */
const MySchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolverMap,
});

mongoose.connect(mongoURL, (err) => {
  if (err) {
    console.error('Could not connect to MongoDB!');
    console.error(err);
  }
  console.log('successfull connection');
});

/**
 * A simple express app that takes our GraphQL schema and serves its API.
 */
const app = express();
const PORT = 4000;
app.use('/graphql', graphqlHTTP({
  schema: MySchema,
  graphiql: true
}));
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
