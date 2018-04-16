import * as React from 'react';
// импортируем функиця для обретки компонентов из домена
import { wrap } from './domain';

/*
  пишем "глупый" компонент который рисует элемент списка фильтров.
  В пропертях он получает
  disabled - флаг означающий что элемент не активный (в данный момент уже выбран)
  children - внутренее содержимое элемента (текст)
  onClick - функция которая будет вызвана при клике по элементу
  filter - значение из енума фильтров, которому соотвествует данный элемент
*/
interface ILinkProps {
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
  filter: string;
}
const Link = ({ disabled, children, onClick }: ILinkProps) => (
  <button
     onClick={onClick}
     disabled={disabled}
     style={{
         marginLeft: '4px',
     }}
  >
    {children}
  </button>
);

// пишем обертку
export default wrap
  // для получения пропертей оборачиваемого компонента используем третий параметер в нашей лямбде, в нее приходит
  // объект с 3мя вспомогательными функциями: getProps, or, and
  .withProps((state, methods, { getProps }) => ({
    disabled: getProps().filter === state.filter, // если текущий элемент равен тому что сейчас выбран в домене значит нужно его задезаблить
    onClick: () => methods.filter.set(getProps().filter), // при клике мы меняем значение фильтра в домене на то что пришло в пропертях
  }))
  .component(Link); // замыкаем цепочку нашим компонентом 
