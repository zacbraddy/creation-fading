import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import expressGraphQL from 'express-graphql';
import schema from './schemas';
import env from './env';

const app = polka();

if (env.isDev) {
  app.use('/graphql', expressGraphQL({ graphiql: true, schema }));
}

app
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev: env.isDev }),
    sapper.middleware()
  )
  .listen(env.PORT, (err) => {
    if (err) console.log('error', err);
  });
