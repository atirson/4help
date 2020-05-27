import Voluntary from '../models/Voluntary';

class VoluntaryRepository {
    async getVoluntaryByEmail(email) {
        const voluntaryExists = await Voluntary.findOne({
            where: { email },
          });

        return voluntaryExists;
    }
}

export default new VoluntaryRepository();
