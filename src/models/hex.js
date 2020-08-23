const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HexSchema = new Schema({
  terrainType: { type: String },
  col: { type: Number },
  row: { type: Number },
  locationLimit: { type: Number },
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
  { name, description, characterLimit /*, characters*/ }
) {
  const Location = mongoose.model('location');
  const hex = await this.findById(id);

  const newLocation = new Location({
    name,
    description,
    characterLimit,
    // charactersIds,
    hex,
  });

  hex.locations.push(newLocation);

  const [savedLocation, savedHex] = await Promise.all([
    newLocation.save(),
    hex.save(),
  ]);

  return savedLocation;
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

  return savedLocation;
};

HexSchema.statics.findLocations = async function (id) {
  const { locations } = await this.findById(id).populate('locations');

  return locations;
};

HexSchema.statics.addNewCharacter = async function (
  id,
  { name, description, age }
) {
  const Character = mongoose.model('character');
  const hex = await this.findById(id);
  const newCharacter = new Character({
    name,
    description,
    age,
    hex,
  });

  hex.characters.push(newCharacter);

  const [savedCharacter, savedHex] = await Promise.all([
    newCharacter.save(),
    hex.save(),
  ]);

  return savedCharacter;
};

HexSchema.statics.findCharacters = async function (id) {
  const { characters } = await this.findById(id).populate('characters');

  return characters;
};

mongoose.model('hex', HexSchema);
