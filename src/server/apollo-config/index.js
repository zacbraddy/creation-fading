import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import env from '../../env';
import HexDataSource from '../data-sources/hex';
import HexModel from '../models/hex';
import hexResolver from '../resolvers/hex';
import typeSetup from './type-setup';

export default () =>
  new Promise(async (resolve, reject) => {
    console.log('Connecting to creation fading DB');
    mongoose.Promise = global.Promise;
    mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await new Promise((connectResolve) => {
      mongoose.connection
        .once('open', () => {
          console.log('Connected to creation fading DB');
          connectResolve();
        })
        .on('error', (error) => {
          console.log('Error connecting to creation fading DB:', error);
          reject();
        });
    });

    const typeDefs = gql(typeSetup);

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers: hexResolver,
      dataSources: () => ({
        hexes: new HexDataSource(HexModel),
      }),
    });

    try {
      console.log('Starting apollo server');
      const { url } = await apolloServer.listen();
      console.log('Apollo server started at: ', url);
    } catch (err) {
      console.error('Error starting Apollo server: ', err);
      reject();
    }

    resolve();
  });
