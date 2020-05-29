import Sequelize from 'sequelize';

import Voluntary from '../app/models/Voluntary';
import Company from '../app/models/Company';

import databaseConfig from '../config/database';

const models = [Voluntary, Company];

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
