import Company from '../models/Company';

class CompanyController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const company = await Company.findAll({
      attributes: ['id', 'name', 'email', 'cnpj'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(company);
  }

  async store(req, res) {
    const { id, name, email, cnpj, password_hash } = await Company.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      cnpj,
      password_hash,
    });
  }

  async update(req, res) {
    const company = await Company.findByPk(req.body.id);

    const { id, name, email, cnpj } = await company.update(req.body);

    return res.json({ id, name, email, cnpj });
  }

  async delete(req, res) {
    const { id } = req.body;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(401).json({ error: 'Company does not exists.' });
    }

    await company.destroy();

    return res.json({ company: 'Delete with success.' });
  }
}

export default new CompanyController();
