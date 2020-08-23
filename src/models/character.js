const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String },
  description: { type: String },
  characters: { type: Schema.Types.ObjectId, ref: 'character' },
});

LocationSchema.statics.addCharacter = function (id, character) {
  const Character = mongoose.model('character');

  return this.findById(id).then((location) => {
    const character = new Character({ character, location });
    location.characters.push(character);
    return Promise.all([lyric.save(), song.save()]).then(
      ([lyric, song]) => song
    );
  });
};

LocationSchema.statics.findLyrics = function (id) {
  return this.findById(id)
    .populate('lyrics')
    .then((song) => song.lyrics);
};

mongoose.model('character', LocationSchema);
