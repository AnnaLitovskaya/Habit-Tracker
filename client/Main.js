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

    //adds event listeners to the delete buttons
    let deleteButtons = [...document.querySelectorAll('.delete')];
    const deleteClicks = async (ev) => {
      let habitClass = ev.target.classList;
      habitClass.remove('delete');
      await axios.delete(`/api/habits/${habitClass.value}`);
      [days, habits] = await Promise.all([
        (await axios.get(`/api/days`)).data,
        (await axios.get(`/api/habits`)).data,
      ]);
      this.setState({ days, habits });
    };
    deleteButtons.forEach((button) => {
      button.addEventListener('click', deleteClicks);
    });

    //adds event listener to the text box and button
    let input = document.querySelector('#textBox');
    let button = document.querySelector('#addButton');
    button.addEventListener('click', async () => {
      await axios.post(`/api/habits/${input.value}`);
      [days, habits] = await Promise.all([
        (await axios.get(`/api/days`)).data,
        (await axios.get(`/api/habits`)).data,
      ]);
      this.setState({ days, habits });
      input.value = '';
      //updates the event listeners in the grid to include new row
      grid = [...document.querySelectorAll('.grid')];
      grid.forEach((box) => {
        box.removeEventListener('click', gridClicks);
      });
      grid.forEach((box) => {
        box.addEventListener('click', gridClicks);
      });
      //updates event listeners for new row delete button
      deleteButtons = [...document.querySelectorAll('.delete')];
      deleteButtons.forEach((button) => {
        button.removeEventListener('click', deleteClicks);
      });
      deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteClicks);
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
