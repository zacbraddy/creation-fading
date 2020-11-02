import { printType } from 'graphql';
import HexType from '../schemas/hex-type';
//import CharacterType from '../schemas/character-type';
//import LocationType from '../schemas/location-type';

export default `
    ${printType(HexType)}

    type Query {
        hexes: [HexType]
    }
`;
