const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const Hex = mongoose.model('hex');
const Character = mongoose.model('character');

const CharacterType = new GraphQLObjectType({
  name: 'CharacterType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    age: { type: GraphQLInt },
    hex: {
      type: require('./hex-type'),
      async resolve(parentValue) {
        const { hex } = await Character.findById(parentValue).populate('hex');

        return hex;
      },
    },
    location: {
      type: require('./location-type'),
      async resolve(parentValue) {
        const { location } = await Character.findById(parentValue).populate(
          'location'
        );

        return location;
      },
    },
  }),
});

module.exports = CharacterType;
