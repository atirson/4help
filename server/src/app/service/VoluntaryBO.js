import * as Yup from 'yup';
import Voluntary from '../models/Voluntary';
import VoluntaryRepository from '../repository/VoluntaryRepository';    

class VoluntaryBO {
    async validateStore(req, res, next) {
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
      
          if (await VoluntaryRepository.getVoluntaryByEmail(req.body.email)) {
            return res.status(401).json({ error: 'Voluntary already exists.' });
          }

        return next();
    }

    async validateUpdate(req, res, next) {
        const schema = Yup.object().shape({
            id: Yup.number().integer(),  
            name: Yup.string(),
            email: Yup.string().email(),
            linkedin: Yup.string(),
          });
      
          if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
          }
   
          const voluntary = await Voluntary.findByPk(req.body.id);
      
          if (!voluntary) {
            return res.status(401).json({ error: 'Voluntary does not exists.' });
          }

          return next();
    }
}

export default new VoluntaryBO();
