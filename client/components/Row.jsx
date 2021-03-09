import React, { Component } from 'react';

const Row = (props) => {
  return (
    <tbody>
      {props.habits.map((habit) => {
        return (
          <tr key={habit.id}>
            <th>
              <button>X</button>
              {habit.name}
            </th>
            {props.days.map((day, idx1) => {
              props.checks.map((check, idx2) => {
                console.log(check);
                // <th key={(idx1, idx2)}>
                //   {check.dayId === day.id && habit.id === check.habitId
                //     ? 'X'
                //     : 'O'}
                // </th>;
              });
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Row;
