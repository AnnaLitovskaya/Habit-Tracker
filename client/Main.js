import React, { Component } from 'react';
import Table from './components/Table.jsx';
import axios from 'axios';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      days: [],
      habits: [],
      checks: [],
    };
    this.initializeGrid = this.initializeGrid.bind(this);
  }

  async initializeGrid() {
    this.setState({ days, habits });
    let grid = [...document.querySelectorAll('.grid')];
    grid.forEach((box) => {
      box.addEventListener('click', async (ev) => {
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
        let [days, habits] = await Promise.all([
          (await axios.get(`/api/days`)).data,
          (await axios.get(`/api/habits`)).data,
        ]);
        this.setState({ days, habits });
      });
    });
  }

  async componentDidMount() {
    let [days, habits] = await Promise.all([
      (await axios.get(`/api/days`)).data,
      (await axios.get(`/api/habits`)).data,
    ]);
    this.setState({ days, habits });

    await this.initializeGrid();

    let input = document.querySelector('#textBox');
    let button = document.querySelector('#addButton');
    button.addEventListener('click', async () => {
      await axios.post(`/api/habits/${input.value}`);
      [days, habits] = await Promise.all([
        (await axios.get(`/api/days`)).data,
        (await axios.get(`/api/habits`)).data,
      ]);
      this.setState({ days, habits });
      await this.initializeGrid();
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
