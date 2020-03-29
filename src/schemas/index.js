import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} from "graphql";
import axios from "axios";

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const CharacterType = new GraphQLObjectType({
  name: "Character",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    location: {
      type: LocationType,
      async resolve(parentValue, args) {
        const { data } = await axios.get(
          `http://localhost:4000/locations/${parentValue.locationId}`
        );
        return data;
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const { data } = await axios.get(
          `http://localhost:4000/characters/${args.id}`
        );
        return data;
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery });
