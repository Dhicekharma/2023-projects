const express = require('express');
const app = express();
const port = 7000;

const crypto = require('crypto');

// Generate a random encryption key (32 bytes = 256 bits)
const encryptionKey = crypto.randomBytes(32).toString('hex');
console.log('Encryption Key:', encryptionKey);

app.get('/encryption-key', (req, res) => {
  res.json({ encryptionKey });
});

app.listen(port, () => {
  console.log(`Local REST API listening at http://localhost:${port}`);
});