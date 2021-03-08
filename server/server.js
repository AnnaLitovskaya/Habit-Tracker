const express = require('express');
const app = express();
const {
  syncAndSeed,
  db,
  models: { Habit, Day, Check },
} = require('./db');

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
