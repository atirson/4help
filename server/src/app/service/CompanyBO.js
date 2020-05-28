import * as Yup from 'yup';
import Company from '../models/Company';
import CompanyRepository from '../repository/CompanyRepository';

class CompanyBO {
  async validateStore(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cnpj: Yup.number().required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (
      await CompanyRepository.getCompanyByEmailOrCnpj(
        req.body.email,
        req.body.cnpj
      )
    ) {
      return res.status(401).json({ error: 'Company already exists.' });
    }

    return next();
  }

  async validateUpdate(req, res, next) {
    const schema = Yup.object().shape({
      id: Yup.number().integer(),
      name: Yup.string(),
      email: Yup.string().email(),
      cnpj: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.body;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(401).json({ error: 'Company does not exists.' });
    }

    if (
      await CompanyRepository.getCompanySameCnpjEmail(
        req.body.id,
        req.body.cnpj,
        req.body.email
      )
    ) {
      return res
        .status(401)
        .json({ error: 'The CNPJ/Email is already in use.' });
    }

    return next();
  }
}

export default new CompanyBO();
