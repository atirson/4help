import * as Yup from 'yup';
import Voluntary from '../models/Voluntary';

class VoluntaryController {
   async index(req, res) {
     const { page = 1 } = req.query;

     const voluntary = await Voluntary.findAll({
       attributes: ['id', 'name', 'email'],
       limit: 20,
       offset: (page - 1) * 20,
     });

     return res.json(voluntary);
   }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      linkedin: Yup.string().required(),
      password: Yup.string().min(6).required(),  
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const voluntaryExists = await Voluntary.findOne({
      where: { email: req.body.email },
    });

    if (voluntaryExists) {
      return res.status(401).json({ error: 'Voluntary already exists.' });
    }

    const {id, name, email, linkedin, password_hash} = await Voluntary.create(req.body);

    return res.json({
        id, 
        name, 
        email, 
        linkedin, 
        password_hash
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().integer(),  
      name: Yup.string(),
      email: Yup.string().email(),
      linkedin: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, email, linkedin } = req.body;
    const voluntary = await Voluntary.findByPk(id);

    if (!voluntary) {
      return res.status(401).json({ error: 'Voluntary does not exists.' });
    }

    await voluntary.update(req.body);

    return res.json({ id, name, email, linkedin});
  }

  async delete(req, res) {
    const { id } = req.body;
    const voluntary = await Voluntary.findByPk(id);

    if (!voluntary) {
      return res.status(401).json({ error: 'Voluntary does not exists.' });
    }

    await voluntary.destroy();

    return res.json({ voluntary: 'Delete with success.' });
  }
}

export default new VoluntaryController();