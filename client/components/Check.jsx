import React, { Component } from 'react';

const Check = (props) => {
  let result = ``;
  for (let i = 0; i < 7; i++) {
    result += `<tr>${props.checks.map((check) => {
      return (
        <th>
          {check.habitId === props.habits.id && check.dayId === i ? 'X' : 'O'}
        </th>
      );
    })
  }</tr>`
  return result;
};

export default Check;

{
  /* {props.checks.map(check => {
              return (
                <th>
                  {check.habitId === habit.id}
                </th>
              )
            })} */
}
