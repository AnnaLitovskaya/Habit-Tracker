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
                        {check.dayId === day.id && check.check === true
                          ? 'X'
                          : ''}
                      </span>
                    );
                  })}
                </th>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Row;
