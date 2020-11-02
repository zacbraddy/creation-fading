import mongoose from 'mongoose';
const Hex = mongoose.model('hex');

export default {
  Query: {
    hexes: async (_source, _args, { dataSources }) => {
      return dataSources.hexes.findAll();
    },
  },
};
