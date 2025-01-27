const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../data/users');
const { secret } = require('../crypto/config');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session && req.session.user) {
    return res.send(`<h1>Welcome ${req.session.user.name}</h1>
                     <a href="/dashboard">Go to Dashboard</a><br>
                     <form action="/logout" method="POST"><button type="submit">Logout</button></form>`);
  }

  res.send(`<form action="/login" method="POST">
              <label>Username:</label><input type="text" name="username"><br>
              <label>Password:</label><input type="password" name="password"><br>
              <button type="submit">Login</button>
            </form>`);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(400).send('Invalid username or password.');
  if (!bcrypt.compareSync(password, user.password)) return res.status(400).send('Invalid username or password.');

  const token = jwt.sign({ id: user.id, name: user.name }, secret, { expiresIn: '1h' });
  req.session.user = user; 
  res.send({ message: 'Login successful', token });
});

router.get('/dashboard', authenticateToken, (req, res) => {
  res.send(`<h1>Welcome to the dashboard, ${req.user.name}!</h1>`);
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
