import * as React from 'react';
import { wrap, FILTERS } from './domain';
import AddItem from './AddItem';
import FilterLink from './FilterLink';
import Items from './Items';

// Данный компоннт является "рутовым" для нашего комопнента todo так как содержит все остальные компоненты из текущей папки
// в нем мы просто отрисовываем все наши обернутые компоненты в нужном порядке и в нужных местах
export const TodoList = () => (
  <div>
     <div>
      <span>Показывать: </span>
      <FilterLink filter={FILTERS.ALL}>
        Все
      </FilterLink>
      <FilterLink filter={FILTERS.ONLY_UNDONE}>
        Не сделанные
      </FilterLink>
      <FilterLink filter={FILTERS.ONLY_DONE}>
        Сделанные
      </FilterLink>
    </div>
    <Items />
    <AddItem />
  </div>
);

export default wrap.rootComponent(TodoList);
  