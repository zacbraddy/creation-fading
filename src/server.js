import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { graphqlHTTP } from 'express-graphql';
import './server/models';
import schema from './server/schemas';
import env from './env';

const app = polka();

console.log('Connecting to creation fading DB');
mongoose.Promise = global.Promise;
mongoose.connect(env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once('open', () => console.log('Connected to creation fading DB'))
  .on('error', (error) =>
    console.log('Error connecting to creation fading DB:', error)
  );

if (env.isDev) {
  app.use('/graphql', graphqlHTTP({ graphiql: true, schema }));
}

app
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev: env.isDev }),
    bodyParser.json(),
    sapper.middleware()
  )
  .listen(env.PORT || 3000, (err) => {
    if (err) console.log('error', err);
  });
