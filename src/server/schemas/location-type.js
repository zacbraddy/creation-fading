const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const Location = mongoose.model('location');

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    characterLimit: { type: GraphQLInt },
    hex: {
      type: require('./hex-type'),
      async resolve(parentValue) {
        const { hex } = await Location.findById(parentValue).populate('hex');

        return hex;
      },
    },
  }),
});

module.exports = LocationType;
