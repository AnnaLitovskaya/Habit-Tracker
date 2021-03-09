const express = require('express');
const router = express.Router();
const {
  Op,
  model: { Habit, Day, Check },
} = require('./db');

router.get('/habits', async (req, res, next) => {
  try {
    const habitList = await Habit.findAll({
      include: {
        model: Check,
      },
      order: ['id', [{ model: Check }, 'id']],
    });
    res.send(habitList);
  } catch (ex) {
    next(ex);
  }
});

router.get('/days', async (req, res, next) => {
  try {
    const dayList = await Day.findAll({
      order: ['id'],
    });
    res.send(dayList);
  } catch (ex) {
    next(ex);
  }
});

router.put('/checks/:habitIdx/:dayIdx', async (req, res, next) => {
  try {
    let local = await Check.findAll({
      where: {
        [Op.and]: [
          { habitId: req.params.habitIdx },
          { dayId: req.params.dayIdx },
        ],
      },
    });

    if (local.length === 0) {
      local = await Check.create({
        habitId: req.params.habitIdx,
        dayId: req.params.dayIdx,
        check: true,
      });
    } else {
      if (local[0].check === true) {
        await Check.update(
          {
            check: false,
          },
          {
            where: {
              [Op.and]: [
                { habitId: req.params.habitIdx },
                { dayId: req.params.dayIdx },
              ],
            },
          }
        );
      } else {
        await Check.update(
          {
            check: true,
          },
          {
            where: {
              [Op.and]: [
                { habitId: req.params.habitIdx },
                { dayId: req.params.dayIdx },
              ],
            },
          }
        );
      }
    }

    res.send(local);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
