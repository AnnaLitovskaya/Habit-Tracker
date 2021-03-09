const express = require('express');
const app = express();
const { syncAndSeed, db } = require('./db');
const router = require('./router');
const path = require('path');

app.use('/api', router);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
);

app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

const init = async () => {
  try {
    db.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
