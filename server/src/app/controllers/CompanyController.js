import * as Yup from 'yup';
import Company from '../models/Company';

class CompanyController {
   async index(req, res) {
     const { page = 1 } = req.query;

     const company = await Company.findAll({
       attributes: ['id', 'name', 'email'],
       limit: 20,
       offset: (page - 1) * 20,
     });

     return res.json(company);
   }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cnpj: Yup.number().required(),
      password: Yup.string().min(6).required(),  
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const companyExists = await Company.findOne({
      where: { email: req.body.email },
    });

    if (companyExists) {
      return res.status(401).json({ error: 'Company already exists.' });
    }

    const {id, name, email, cnpj, password_hash} = await Company.create(req.body);

    return res.json({
        id, 
        name, 
        email, 
        cnpj, 
        password_hash
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().integer(),  
      name: Yup.string(),
      email: Yup.string().email(),
      cnpj: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, email, cnpj } = req.body;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(401).json({ error: 'Company does not exists.' });
    }

    await company.update(req.body);

    return res.json({ id, name, email, cnpj});
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