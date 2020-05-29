/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    let voluntaries = [];

    for (let i = 1; i <= 100; i++) {
      const name = faker.name.findName();
      const email = faker.internet.email(name);
      const linkedin = faker.internet.url();
      const number = faker.internet.password(6);

      voluntaries.push({
        name,
        email,
        linkedin,
        password_hash: bcrypt.hashSync(number, 8),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('voluntaries', voluntaries);
  },

  down: () => {},
};
