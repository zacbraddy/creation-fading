const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HexSchema = new Schema({
  terrainType: { type: String },
  col: { type: number },
  row: { type: number },
  locationLimit: { type: number },
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'location',
    },
  ],
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'character',
    },
  ],
});

HexSchema.statics.addNewLocation = async function (
  id,
  { name, description, characterLimit, characters }
) {
  const Location = mongoose.model('location');
  const newLocation = new Location({
    name,
    description,
    characterLimit,
    characters,
    hex,
  });

  const hex = await this.findById(id);
  hex.locations.push(newLocation);

  const [savedLocation, savedHex] = await Promise.all([
    newLocation.save(),
    hex.save(),
  ]);

  return savedHex;
};

HexSchema.statics.addExistingLocation = async function (hexId, locationId) {
  const hex = await this.findById(hexId);
  const location = await mongoose.model('location').findById(locationId);

  location.hex = hex;
  hex.locations.push(location);

  const [savedLocation, savedHex] = await Promise.all([
    location.save(),
    hex.save(),
  ]);

  return savedHex;
};

HexSchema.statics.findLocations = async function (id) {
  const locations = await this.findById(id).populate('locations');

  return hex.locations;
};

HexSchema.statics.addNewCharacter = async function (
  id,
  { name, description, age, location, hex }
) {
  const Character = mongoose.model('character');
  const newCharacter = new Character({
    name,
    description,
    age,
    location,
    hex,
  });

  const hex = await this.findById(id);
  hex.characters.push(newCharacter);

  const [savedCharacter, savedHex] = await Promise.all([
    newCharacter.save(),
    hex.save(),
  ]);

  return savedHex;
};

HexSchema.statics.addExistingLocation = async function (hexId, characterId) {
  const hex = await this.findById(hexId);
  const character = await mongoose.model('character').findById(characterId);

  character.hex = hex;
  hex.characters.push(character);

  const [savedCharacter, savedHex] = await Promise.all([
    character.save(),
    hex.save(),
  ]);

  return savedHex;
};

HexSchema.statics.findCharacters = async function (id) {
  const characters = await this.findById(id).populate('characters');

  return hex.characters;
};

mongoose.model('hex', HexSchema);
