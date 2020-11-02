const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Hex = mongoose.model('hex');
const Location = mongoose.model('location');
const HexType = require('./hex-type');
const LocationType = require('./location-type');
const CharacterType = require('./character-type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addHex: {
      type: HexType,
      args: {
        terrainType: { type: GraphQLString },
        col: { type: GraphQLInt },
        row: { type: GraphQLInt },
        locationLimit: { type: GraphQLInt },
      },
      resolve(parentValue, { terrainType, col, row, locationLimit }) {
        return new Hex({ terrainType, col, row, locationLimit }).save();
      },
    },
    addLocationToHex: {
      type: LocationType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        characterLimit: { type: GraphQLInt },
        hexId: { type: GraphQLID },
      },
      resolve(parentValue, { name, description, characterLimit, hexId }) {
        return Hex.addNewLocation(hexId, { name, description, characterLimit });
      },
    },
    addCharacterToHex: {
      type: CharacterType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        age: { type: GraphQLInt },
        hexId: { type: GraphQLID },
      },
      resolve(parentValue, { name, description, age, hexId }) {
        return Hex.addNewCharacter(hexId, { name, description, age });
      },
    },
    deleteHex: {
      type: HexType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Hex.remove({ _id: id });
      },
    },
  },
});

module.exports = mutation;
