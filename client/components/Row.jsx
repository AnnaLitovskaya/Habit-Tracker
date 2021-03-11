import React, { Component } from 'react';

//I know its bad. I don't like this either...
const Row = (props) => {
  return (
    <tbody>
      {/* cycles through the habits */}
      {props.habits.map((habit) => {
        return (
          <tr key={habit.id}>
            {/* delete button and habit name */}
            <th>
              <button className={`delete ${habit.id}`}>X</button>
              {habit.name}
            </th>
            {/* adds boxes for each of the seven days
            each 'block' has classnames that correspond with day and habit */}
            {props.days.map((day, dayIdx) => {
              return (
                <th className={`grid h${habit.id} d${dayIdx}`} key={dayIdx}>
                  {/* cycles through the checks in each habit
                  adds a check if day id corresponds to check day id
                  the span and the emoji also have a habit and day class so that I can click it */}
                  {habit.checks.map((check, idx) => {
                    return (
                      <span key={idx} className={`h${habit.id} d${dayIdx}`}>
                        {check.dayId === day.id ? (
                          <span className={`h${habit.id} d${dayIdx}`}>
                            &#128077;
                          </span>
                        ) : (
                          ''
                        )}
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
        {/* input text box and button */}
        <th>
          <input id="textBox" type="text" placeholder="New Habit"></input>
          <button id="addButton">Add</button>
        </th>
      </tr>
    </tbody>
  );
};

export default Row;
