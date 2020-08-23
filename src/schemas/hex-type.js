const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const Hex = mongoose.model('hex');
const LocationType = require('./location-type');

const SongType = new GraphQLObjectType({
  name: 'HexType',
  fields: () => ({
    id: { type: GraphQLID },
    terrainType: { type: GraphQLString },
    col: { type: GraphQLInt },
    row: { type: GraphQLInt },
    locationLimit: { type: GraphQLInt },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parentValue) {
        return Hex.findLocations(parentValue.id);
      },
    },
  }),
});

module.exports = SongType;