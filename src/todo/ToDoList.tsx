import * as React from 'react';
import { wrap } from './domain';
import AddItem from './AddItem';
import Filter from './Filter';
import Items from './Items';

// Данный компоннт является "рутовым" для нашего комопнента todo так как содержит все остальные компоненты из текущей папки
// в нем мы просто отрисовываем все наши обернутые компоненты в нужном порядке и в нужных местах
export const TodoList = () => (
  <div>
    <Filter />
    <Items />
    <AddItem />
  </div>
);

export default wrap.rootComponent(TodoList);
  