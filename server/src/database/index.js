import Sequelize from 'sequelize';

import Voluntary from '../app/models/Voluntary';

import databaseConfig from '../config/database';

const models = [Voluntary];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
