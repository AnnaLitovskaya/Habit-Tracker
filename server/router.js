const express = require('express');
const router = express.Router();
const {
  model: { Habit, Day, Check },
} = require('./db');

router.get('/habits', async (req, res, next) => {
  try {
    const habitList = await Habit.findAll({
      include: {
        model: Check,
      },
    });
    res.send(habitList);
  } catch (ex) {
    next(ex);
  }
});

router.get('/days', async (req, res, next) => {
  try {
    const dayList = await Day.findAll({
      include: {
        model: Check,
      },
    });
    res.send(dayList);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;