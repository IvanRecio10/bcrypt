const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: 'user1',
    password: bcrypt.hashSync('password1', 10),
    name: 'User One'
  },
  {
    id: 2,
    username: 'user2',
    password: bcrypt.hashSync('password2', 10),
    name: 'User Two'
  }
];

module.exports = users;
