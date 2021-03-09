import React, { Component } from 'react';
import Row from './Row.jsx';

const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {props.days.map((day) => (
            <th className="rotate" key={day.id}>
              <div>
                <span>{day.name}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <Row days={props.days} habits={props.habits} />
    </table>
  );
};

export default Table;
