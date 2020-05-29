/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    let companies = [];

    for (let i = 1; i <= 100; i++) {
      const name = faker.company.companyName();
      const email = faker.internet.email(name);
      const cnpj = faker.random.number({ min: 0, max: 100000 });
      const number = faker.internet.password(6);

      companies.push({
        name,
        email,
        cnpj,
        password_hash: bcrypt.hashSync(number, 8),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('companies', companies);
  },

  down: () => {},
};
