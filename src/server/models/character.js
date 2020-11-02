const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String },
  description: { type: String },
  age: { type: Number },
  hex: { type: Schema.Types.ObjectId, ref: 'hex' },
  location: { type: Schema.Types.ObjectId, ref: 'location' },
});

mongoose.model('character', CharacterSchema);
