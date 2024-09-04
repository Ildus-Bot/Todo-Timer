import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

export default class Task extends React.Component {
  static defaultProps = {
    onChangeTaskItem: () => {},
    onDeleteTaskItem: () => {},
  };

  static propTypes = {
    todoList: (props, propName, componentName) => {
      const valueProps = props[propName];

      if (typeof valueProps === 'object') {
        return null;
      }

      return new TypeError(`${componentName} must be object`);
    },
  };

  drawingAccess = this.props.todoList.className === 'editing' ? true : false;

  state = {
    value: this.props.todoList.description,
    minutes: this.props.todoList.minutes === 0 ? null : this.props.todoList.minutes,
    seconds: this.props.todoList.seconds === 0 ? null : this.props.todoList.seconds,
    idInterval: '',
  };

  componentWillUnmount() {
    if (this.state.idInterval) {
      clearInterval(this.state.idInterval);
    }
  }

  timer = () => {
    if (this.state.minutes === 0 && this.state.seconds === 0) {
      clearInterval(this.state.idInterval);
      return;
    }

    if (this.state.seconds > 0) {
      this.setState((prevState) => {
        return {
          seconds: prevState.seconds - 1,
        };
      });
      return;
    }

    if (this.state.minutes > 0) {
      this.setState((prevState) => {
        return {
          minutes: prevState.minutes - 1,
          seconds: 59,
        };
      });
      return;
    }
  };

  handlerPlay = () => {
    if (!this.state.idInterval) {
      const idInterval = setInterval(() => {
        this.timer();
      }, 1000);
      this.setState({
        idInterval,
      });
    }
  };

  handlerPause = () => {
    clearInterval(this.state.idInterval);
    this.setState({ idInterval: '' });
  };

  onLabelClick = () => {
    this.props.onChangeTaskItem(this.props.todoList.id);
  };

  onLabelClickDestroy = () => {
    this.props.onDeleteTaskItem(this.props.todoList.id);
  };

  changeRenderingData = (isEditing = true) => {
    if (this.state.idInterval) {
      clearInterval(this.state.idInterval);
      this.setState({
        idInterval: '',
      });
    }
    this.drawingAccess = !this.drawingAccess;
    this.props.onChangeTaskItem(this.props.todoList.id, isEditing);
  };

  changeDescription = (e) => {
    if (e.key === 'Enter') {
      this.props.onChangeTaskItem(this.props.todoList.id, true, this.state.value);
      this.setState({
        value: '',
      });

      this.changeRenderingData(false);
    }
  };

  changeValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const createdAgo = `created ${formatDistanceToNow(this.props.todoList.dateOfCreation)} ago`;
    const { todoList } = this.props;
    let { minutes, seconds } = this.state;

    if (minutes || seconds) {
      minutes = minutes ? minutes : 0;
      seconds = seconds ? seconds : 0;
    }

    return (
      <div>
        <div className="view">
          <input
            className="toggle"
            onClick={this.onLabelClick}
            defaultChecked={todoList.className === 'completed' ? true : false}
            type="checkbox"
          />
          <label>
            <span className="title" onClick={this.onLabelClick}>
              {todoList.description}
            </span>
            <span className={minutes !== null || seconds !== null ? 'description' : 'hidden'}>
              <button className="icon icon-play" onClick={this.handlerPlay}></button>
              <button className="icon icon-pause" onClick={this.handlerPause}></button>
              {`${minutes}:${seconds}`}
            </span>
            <span className="description">{createdAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={this.changeRenderingData}></button>
          <button className="icon icon-destroy" onClick={this.onLabelClickDestroy}></button>
        </div>
        {this.drawingAccess && (
          <input
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.changeValue}
            onKeyPress={this.changeDescription}
          />
        )}
      </div>
    );
  }
}
