import * as React from 'react';
import { ToDoList } from './todo';

// Это входной компонент приложения, на который мы помещаем наш компонент ToDoList, что бы он появился на странице

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ToDoList />
      </div>
    );
  }
}
