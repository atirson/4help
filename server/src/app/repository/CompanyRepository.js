import Company from '../models/Company';

const { Op } = require('sequelize');

class CompanyRepository {
  async getCompanyByEmailOrCnpj(email, cnpj) {
    const companyExists = await Company.findOne({
      where: { [Op.or]: [{ email }, { cnpj }] },
    });

    return companyExists;
  }

  async getCompanySameCnpjEmail(id, cnpj, email) {
    const cnpjExists = await Company.findAll({
      where: { id: { [Op.not]: id }, cnpj, email },
    });

    return cnpjExists;
  }
}

export default new CompanyRepository();
