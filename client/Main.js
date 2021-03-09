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
  }

  async componentDidMount() {
    const [days, habits, checks] = await Promise.all([
      (await axios.get(`/api/days`)).data,
      (await axios.get(`/api/habits`)).data,
      (await axios.get(`/api/checks`)).data,
    ]);
    this.setState({ days });
    this.setState({ habits });
    this.setState({ checks });
  }

  render() {
    const { days, habits, checks } = this.state;
    return (
      <div>
        <h1>Habit Tracker</h1>
        <Table days={days} habits={habits} checks={checks} />
      </div>
    );
  }
}

export default Main;
