import Sequelize from 'sequelize';

import Vonlutary from '../app/models/Vonlutary';

import databaseConfig from '../config/database';

const models = [Vonlutary];

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
