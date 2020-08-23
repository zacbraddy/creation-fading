const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const Hex = mongoose.model('hex');
const Location = mongoose.model('location');
const HexType = require('./hex-type');
const LocationType = require('./location-type');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    hexs: {
      type: new GraphQLList(HexType),
      resolve() {
        return Hex.find({});
      },
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve() {
        return Location.find({});
      },
    },
    hex: {
      type: HexType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Hex.findById(id);
      },
    },
    location: {
      type: LocationType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Location.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
