const express = require('express');
const faker = require('faker');
const router = express.Router();

const users = [];

for (let i = 0; i < 100; i++) {
  users.push({
    id: i,
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
  });
}

router.get('/', (request, response) => {
  const { limit, offset } = request.query;

  if (limit && offset) {
    response.json({ limit, offset });
  }
  response.json(users);
});


router.get('/:id_user', (request, response) => {
  const {id_user} = request.params
  response.json(users[id_user]);
});


module.exports = router;
