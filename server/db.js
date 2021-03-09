const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/habit_tracker',
  { logging: false }
);
const { DataTypes } = Sequelize;

const Habit = db.define('habit', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Day = db.define('day', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Check = db.define('check', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  check: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Habit.belongsToMany(Day, {
  through: 'check',
});
Day.belongsToMany(Habit, {
  through: 'check',
});
Check.belongsTo(Day);
Check.belongsTo(Habit);
Day.hasMany(Check);
Habit.hasMany(Check);

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      [
        'Exercise',
        'Meditate',
        'Floss',
        'Eat Breakfast',
        'Read',
        'Drink Water',
        'Call Mom',
        'Study',
      ].map((name) => Habit.create({ name })),
      [
        ['Monday', 0],
        ['Tuesday', 1],
        ['Wednesday', 2],
        ['Thursday', 3],
        ['Friday', 4],
        ['Saturday', 5],
        ['Sunday', 6],
      ].map((day) => Day.create({ name: day[0], id: day[1] }))
    );
    Check.bulkCreate([
      { check: true, dayId: 3, habitId: 2 },
      { check: true, dayId: 5, habitId: 5 },
      { check: true, dayId: 1, habitId: 8 },
      { check: true, dayId: 6, habitId: 1 },
      { check: true, dayId: 2, habitId: 6 },
      { check: true, dayId: 6, habitId: 4 },
      { check: true, dayId: 4, habitId: 2 },
      { check: true, dayId: 3, habitId: 1 },
    ]);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed, db, model: { Habit, Day, Check } };
