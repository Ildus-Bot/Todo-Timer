import React from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    text: '',
    minute: '',
    second: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let { minute, second } = this.state;

    if (minute === '0' && second === '0') {
      minute = null;
      second = null;
    }

    minute = minute ? minute : null;
    second = second ? second : null;

    this.props.addTaskItem(this.state.text, minute, second);

    this.setState({
      text: '',
      minute: '',
      second: '',
    });
  };

  isNumber = (num) => {
    return typeof Number(num) === 'number' && !isNaN(num);
  };

  render() {
    const { text, minute, second } = this.state;

    return (
      <form className="new-todo-form" onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          value={text}
          required
          size="2"
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          max="9999"
          size="5"
          value={minute}
          onChange={(e) => {
            this.setState({ minute: e.target.value });
          }}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          max="60"
          size="5"
          value={second}
          onChange={(e) => {
            this.setState({ second: e.target.value });
          }}
          placeholder="Sec"
        />
        <input hidden type="submit" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addTaskItem: () => {},
};
