import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import resolverMap from './data/resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import path from 'path';
import mongoURL from '../config/db';
import {
  ensureAuthTokenPresent,
  ensureUserAuthenticated,
} from './auth/jwt'
import schema from './data/schema.graphql';

// const schema = fs.readFileSync(path.join(__dirname, 'data/schema.graphql')).toString();

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

app.use('*', (req, res, next) => {
//  console.log('Request: ', req);
  next();
})

app.use('/graphql', graphqlHTTP(request => {
  const startTime = Date.now();
  return {
    schema: MySchema,
    graphiql: true,
    context: { user: request.user },
    extensions({ document, variables, operationName, result }) {
      return { runTime: Date.now() - startTime };
    }
  };
}));

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
