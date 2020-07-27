import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} from 'graphql';
import axios from 'axios';

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    characters: {
      type: new GraphQLList(CharacterType),
      async resolve(parentValue, args) {
        const { data } = await axios.get(
          `http://localhost:4000/locations/${parentValue.id}/characters`
        );
        return data;
      },
    },
  }),
});

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
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
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
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
    location: {
      type: LocationType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const { data } = await axios.get(
          `http://localhost:4000/locations/${args.id}`
        );
        return data;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCharacter: {
      type: CharacterType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        locationId: { type: GraphQLString },
      },
      async resolve(parentValue, { firstName, age }) {
        const { data } = await axios.post(`http://localhost:4000/characters`, {
          firstName,
          age,
        });
        return data;
      },
    },
    deleteCharacter: {
      type: CharacterType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:4000/characters/${id}`);
      },
    },
    editCharacter: {
      type: CharacterType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        locationId: { type: GraphQLString },
      },
      async resolve(parentValue, { id, firstName, age, locationId }) {
        const { data } = await axios.patch(
          `http://localhost:4000/characters/${id}`,
          {
            firstName,
            age,
            locationId,
          }
        );
        return data;
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation });
