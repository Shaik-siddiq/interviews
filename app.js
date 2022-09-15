const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// eslint-disable-next-line no-console
app.listen(9000, () => console.log('OMR UI running on port 9000'));
