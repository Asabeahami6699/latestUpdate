const express = require('express');

const app = express();
app.use(express.json()); 

const crypto = require('crypto');

const generateUniqueId = () => {
  return crypto.randomBytes(10).toString('hex');
};

module.exports = { generateUniqueId };
