const mongoose = require('mongoose');
import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Hexes extends MongoDataSource {
  async findHex(hexId) {
    return this.findOneById(hexId);
  }

  async findAll() {
    return this.model.find({});
  }

  async addNewLocation(
    id,
    { name, description, characterLimit /*, characters*/ }
  ) {
    const Location = mongoose.model('location');
    const hex = await this.findByOneId(id);

    const newLocation = new Location({
      name,
      description,
      characterLimit,
      hex,
    });

    hex.locations.push(newLocation);

    const [savedLocation, savedHex] = await Promise.all([
      newLocation.save(),
      hex.save(),
    ]);

    return savedLocation;
  }
}
