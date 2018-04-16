import * as React from 'react';
import { wrap, FILTERS } from './domain';
import AddItem from './AddItem';
import FilterLink from './FilterLink';
import Items from './Items';

// Данный компоннт является "рутовым" для нашего комопнента todo так как содержит все остальные компоненты из текущей папки
// в нем мы просто отрисовываем все наши обернутые компоненты в нужном порядке и в нужных местах
// Так-же в этом компоненте мы описываем список фильтров доступных на странице.
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

// в качестве дефолтного экспорта используем обернутый с помощью метода rootComponent компонент.
// .rootComponent используется для оборачивания "рутового" компонента страницы и может использовать только один раз для одного домена
export default wrap.rootComponent(TodoList);
  