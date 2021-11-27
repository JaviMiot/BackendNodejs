const express = require('express');
const faker = require('faker');
const router = express.Router();

const UserService = require('../services/userServices')

const usersDb = new UserService();


router.get('/', async (request, response) => {
  const { limit, offset } = request.query;

  if (limit && offset) {
    response.json({ limit, offset });
  }

  const users = await usersDb.find();
  response.json(users);
});


router.get('/:id_user', (request, response) => {
  const { id_user } = request.params
  response.json(users[id_user]);
});


module.exports = router;
