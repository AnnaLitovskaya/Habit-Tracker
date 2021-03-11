import React, { Component } from 'react';
import Table from './components/Table.jsx';
import axios from 'axios';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      days: [],
      habits: [],
    };
  }

  async componentDidMount() {
    //initial set state loads the grid
    let [days, habits] = await Promise.all([
      (await axios.get(`/api/days`)).data,
      (await axios.get(`/api/habits`)).data,
    ]);
    this.setState({ days, habits });

    //adds event listeners on all the grid boxes
    let grid = [...document.querySelectorAll('.grid')];
    const gridClicks = async (ev) => {
      let classes = ev.target.classList;
      let habitIdx = 0;
      let dayIdx = 0;
      classes.forEach((_class) => {
        if (_class.startsWith('h')) {
          habitIdx = _class.slice(1);
        } else if (_class.startsWith('d')) {
          dayIdx = _class.slice(1);
        }
      });
      await axios.put(`/api/checks/${habitIdx}/${dayIdx}`);
      [days, habits] = await Promise.all([
        (await axios.get(`/api/days`)).data,
        (await axios.get(`/api/habits`)).data,
      ]);
      this.setState({ days, habits });
    };
    grid.forEach((box) => {
      box.addEventListener('click', gridClicks);
    });

    //adds event listener to the input box
    let input = document.querySelector('#textBox');
    let button = document.querySelector('#addButton');
    button.addEventListener('click', async () => {
      await axios.post(`/api/habits/${input.value}`);
      [days, habits] = await Promise.all([
        (await axios.get(`/api/days`)).data,
        (await axios.get(`/api/habits`)).data,
      ]);
      this.setState({ days, habits });
      //updates the event listeners to include the new row
      grid = [...document.querySelectorAll('.grid')];
      grid.forEach((box) => {
        box.removeEventListener('click', gridClicks);
      });
      grid.forEach((box) => {
        box.addEventListener('click', gridClicks);
      });
    });
  }

  render() {
    const { days, habits } = this.state;
    return (
      <div>
        <h1>Habit Tracker</h1>
        <Table days={days} habits={habits} />
      </div>
    );
  }
}

export default Main;
