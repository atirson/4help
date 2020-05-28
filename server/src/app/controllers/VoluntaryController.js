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
    const { id, name, email, linkedin, password_hash } = await Voluntary.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      linkedin,
      password_hash,
    });
  }

  async update(req, res) {
    const voluntary = await Voluntary.findByPk(req.body.id);

    const { id, name, email, linkedin } = await voluntary.update(req.body);

    return res.json({ id, name, email, linkedin });
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
