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
            {props.days.map((day, dayIdx) => {
              return (
                <th className={`grid h${habit.id} d${dayIdx}`} key={dayIdx}>
                  {habit.checks.map((check, idx) => {
                    return (
                      <span key={idx} className={`h${habit.id} d${dayIdx}`}>
                        {check.dayId === day.id ? 'X' : ''}
                      </span>
                    );
                  })}
                </th>
              );
            })}
          </tr>
        );
      })}
      <tr>
        <th>
          <input id="textBox" type="text" placeholder="New Habit"></input>
          <button id="addButton">Add</button>
        </th>
      </tr>
    </tbody>
  );
};

export default Row;
