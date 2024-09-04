import React from 'react';

import './TasksFilter.css';

export default class TasksFilter extends React.Component {
  static defaultProps = {
    filterList: () => {},
  };

  state = {
    all: 'selected',
    active: '',
    completed: '',
  };

  filterTaskList = (e) => {
    this.props.filterList(e.target.innerText);
    this.changeSelectedButton(e.target.innerText);
  };

  changeSelectedButton = (textButton) => {
    this.setState({
      all: '',
      active: '',
      completed: '',
    });

    this.setState({
      [textButton.toLowerCase()]: 'selected',
    });
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button type="button" className={this.state.all} onClick={this.filterTaskList}>
            All
          </button>
        </li>
        <li>
          <button type="button" className={this.state.active} onClick={this.filterTaskList}>
            Active
          </button>
        </li>
        <li>
          <button type="button" className={this.state.completed} onClick={this.filterTaskList}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
