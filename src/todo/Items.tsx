import * as React from 'react';
import { wrap, IToDoItem } from './domain';
/*
  пишем "глупый" компонент который рисует 1 элемент списка.
  В нем будет чекбокс, который по клику просто вызывает входную функцию, и рисуется как отмеченый если в item у нас done = true.
  Текст элемента, который тоже берется из item.
  Кнопка "Удалить" которая просто вызывает входную функцию.
  Таким образом мы получили максимально простой компонент без логики.
*/

interface ITodoItemProps {
  item: IToDoItem;
  remove: () => void;
  toggleDone: () => void;
}

export const TodoItem = ({ item, remove, toggleDone }: ITodoItemProps) => ( 
  <div>
    <input type="checkbox" checked={item.done} onClick={toggleDone} />
    {item.text}
    <button type="button" onClick={remove}>Удалить</button>
  </div>
);

/*
  пишем "глупый" компонент который рисует список элементов.
  На входе он получает методы для управления состоянием и список элементов, затем он просто рендерит все элементы
  передавай в качестве параметров remove и toggleDone функции которые уже замкнули текущий элемент и не требуют параметров
*/
interface IItemsProps {
  items: IToDoItem[];
  remove: (item: IToDoItem) => void;
  toggleDone: (item: IToDoItem) => void;
}

export const Items = ( { items, remove, toggleDone }: IItemsProps) => (
  <div>
    {items.map((item, index) => <TodoItem item={item} remove={() => remove(item)} toggleDone={() => toggleDone(item)} key={index}/>)}
  </div>
);

// делаем обертку над компонентом Items
export default wrap // начинаем цепочку
  .withProps((s, m) => ({
    remove: m.list.remove, // берем метод remove из враппера todo для удаления элементов
    toggleDone: m.list.toggleDone, // берем метод toggleDone из враппера todo для измнения значения поля done в элементе
    items: m.getVisibleItems(), // берем из стейта враппер todo все его элементы
  }))
  .component(Items); // замыкаем цепочку компонентом Items и получаем на выходе обернутый компонент
  