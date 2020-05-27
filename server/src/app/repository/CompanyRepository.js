import Company from '../models/Company';
const { Op } = require("sequelize");

class CompanyRepository {
    async getCompanyByEmailOrCnpj(email, cnpj) {
        const companyExists = await Company.findOne({
            where: {[Op.or]: [{ email }, { cnpj }],
          }});

        return companyExists;
    }

    async getCompanySameCnpj(id, cnpj) {    
      const cnpjExists = await Company.findOne({
        where: { [Op.notIn]: id }, cnpj
      });

      return cnpjExists;
    }
}

export default new CompanyRepository();
