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
import passport from 'passport';
import defineFbStrategy from './auth/facebook';

defineFbStrategy(passport);
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
app.use(passport.initialize());

app.use('*', (req, res, next) => {
//  console.log('Request: ', req);
  // console.log('Request: ', req);
  next();
})




app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/graphql_token?access_token=" + req.user.facebook.token );
  }
);

app.get('/graphql_token', (req, res) => {
    res.send("GraphQL token is " + req.query.access_token + " - <a href=\"/logout\">Log out</a>");
  }
);

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
