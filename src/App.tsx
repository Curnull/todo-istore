import * as React from 'react';
import { ToDoList } from './todo';
import './App.css';
const logo = require('./logo.svg');

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ToDoList />
      </div>
    );
  }
}
