const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String },
  description: { type: String },
  characterLimit: { type: Number },
  // charactersIds: [{ type: Schema.Types.ObjectId, ref: 'characters' }],
  hex: {
    type: Schema.Types.ObjectId,
    ref: 'hex',
  },
});

mongoose.model('location', LocationSchema);
