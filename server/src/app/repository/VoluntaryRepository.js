import Voluntary from '../models/Voluntary';

const { Op } = require('sequelize');

class VoluntaryRepository {
  async getVoluntaryByEmail(email) {
    const voluntaryExists = await Voluntary.findOne({
      where: { email },
    });

    return voluntaryExists;
  }

  async getCompanySameEmail(id, email) {
    const emailExists = await Voluntary.findOne({
      where: { id: { [Op.not]: id }, email },
    });

    return emailExists;
  }
}

export default new VoluntaryRepository();
