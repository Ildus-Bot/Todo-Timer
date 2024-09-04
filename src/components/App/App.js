import React from 'react';

import './App.css';

import Header from '../Header';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import TasksFilter from '../TasksFilter';
import CleareCompleted from '../CleareCompleted';
import CounterOfUnfinishedTasks from '../CounterOfUnfinishedTasks';

export default class App extends React.Component {
  constructor() {
    super();

    this.id = 100;

    this.state = {
      tasks: [
        {
          className: 'completed',
          description: 'Completed task',
          id: 1,
          isHidden: false,
          minutes: 0,
          seconds: 0,
          dateOfCreation: new Date('June 25, 2024 23:15:30'),
        },
        {
          className: 'editing',
          description: 'Editing task',
          id: 2,
          isHidden: false,
          minutes: 0,
          seconds: 0,
          dateOfCreation: new Date('June 26, 2024 16:14:11'),
        },
        {
          className: '',
          description: 'Active task',
          id: 3,
          isHidden: false,
          minutes: '3',
          seconds: '34',
          dateOfCreation: new Date('June 27, 2024 13:00:00'),
        },
      ],
    };

    this.changeTaskItem = (id, isEditing = false, description = '') => {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);
        let newItem;

        if (!isEditing) {
          if (tasks[idx].className === 'completed') {
            newItem = { ...tasks[idx], className: '' };
          }

          if (!tasks[idx].className) {
            newItem = { ...tasks[idx], className: 'completed' };
          }

          if (tasks[idx].className === 'editing') {
            newItem = { ...tasks[idx], className: '' };
          }
        } else if (!description) {
          newItem = { ...tasks[idx], className: 'editing' };
        } else {
          newItem = { ...tasks[idx], description };
        }

        const newArray = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)];

        return {
          tasks: newArray,
        };
      });
    };

    this.deleteTaskItem = (id) => {
      this.setState(({ tasks }) => {
        const idx = tasks.findIndex((el) => el.id === id);

        const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];

        return {
          tasks: newArray,
        };
      });
    };

    this.createTaskItem = (text, minutes, seconds) => {
      const newTask = {
        className: '',
        description: text,
        id: this.id++,
        minutes: minutes,
        seconds: seconds,
        isHidden: false,
        dateOfCreation: new Date(),
      };

      return newTask;
    };

    this.addTaskItem = (text, minutes, seconds) => {
      const newObject = [...this.state.tasks, this.createTaskItem(text, minutes, seconds)];

      this.setState({
        tasks: newObject,
      });
    };

    this.changeTaskList = (typeOfFilter) => {
      this.setState(({ tasks }) => ({
        tasks: this.createFilteredArray(typeOfFilter, tasks),
      }));
    };

    this.createFilteredArray = (typeOfFilter, tasks) => {
      const newFilteredArray = [];

      tasks.map((task) => {
        if (typeOfFilter.toLowerCase() === 'completed') {
          if (task.className === typeOfFilter.toLowerCase()) {
            newFilteredArray.push({ ...task, isHidden: false });
          } else {
            newFilteredArray.push({ ...task, isHidden: true });
          }
        }

        if (typeOfFilter.toLowerCase() === 'active') {
          if (task.className === '') {
            newFilteredArray.push({ ...task, isHidden: false });
          } else {
            newFilteredArray.push({ ...task, isHidden: true });
          }
        }

        if (typeOfFilter.toLowerCase() === 'all') {
          newFilteredArray.push({ ...task, isHidden: false });
        }
      });

      return newFilteredArray;
    };

    this.deleteCompletedTasks = () => {
      this.state.tasks.map((task) => {
        if (task.className === 'completed') {
          this.deleteTaskItem(task.id);
        }
      });
    };

    this.getCountOfUnfinishedTasks = () => {
      let count = 0;

      this.state.tasks.map((task) => {
        if (task.className !== 'completed') {
          count++;
        }
      });

      return count;
    };
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <Header />
          <NewTaskForm addTaskItem={this.addTaskItem} />
        </header>

        <section className="main">
          <TaskList
            todoList={this.state.tasks}
            onChangeTaskItem={this.changeTaskItem}
            onDeleteTaskItem={this.deleteTaskItem}
          />

          <footer className="footer">
            <CounterOfUnfinishedTasks countOfUnfinishedTasks={this.getCountOfUnfinishedTasks} />
            <TasksFilter filterList={this.changeTaskList} />
            <CleareCompleted cleareCompletedTasks={this.deleteCompletedTasks} />
          </footer>
        </section>
      </section>
    );
  }
}
