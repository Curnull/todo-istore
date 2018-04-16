/*
 Теперь описываем компонент для добавления нового элемента
*/
import * as React from 'react';
// импортируем функиця для обретки компонентов из домена
import { wrap } from './domain';

/*
Описываем "глупый" компонент с инпутом и кнопкой добавить.
onChangeText - фунция которую надо вызвать при изменении текста в инпуте
text - текущее значение инпута
add - функция которую надо вызвать при нажатии на кнопку "Добавить"
disabled - флаг для указания активности кнопки "Добавить"
*/
interface IProps {
  onChangeText: (v: string) => void;
  text: string;
  add: () => void;
  disabled: boolean;
}

export const AddItem = ( { onChangeText, text, add, disabled }: IProps) => (
  <div>
    <input type="text" onChange={(e) => onChangeText(e.target.value)} value={text} />
    <button type="button" onClick={add} disabled={disabled}>Добавить</button>
  </div>
);

export default wrap // компонент у нас есть, теперь начинаем его оборачивать и предоставлять необходимые проперти
  .withProps((state, methods) => ({
    text: state.newItemText, // значение для инпута берем из стейта домена
    onChangeText: methods.newItemText.set, // метод для изменения текста берем из методов юнита newItemText
    add: methods.addItem, // для добавления элемента берем метод из домена
    disabled: !state.newItemText, // определяем условия когда мы дизаблим кнопку, в нашем случае если не введен текст
  }))
  .component(AddItem); // замыкаем цепочку нашим глупым компонентом и получаем на выходе обернутый умный компонент
  