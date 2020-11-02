import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';

import env from './env';
import apolloStartup from './server/apollo-config';

apolloStartup().then(() => {
  const app = polka();

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
});
