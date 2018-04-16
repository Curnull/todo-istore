// импортируем необходимые для формирования нашего домена функици
// domain - создает экземпляр домена
// listValue - юнит который в стете храни список элементов и предоставляет набор методов для модификации этого списка
// value - юнит который в стейте хранит какое-либо значение и предоставляет метод set для его изменения
import { domain, listValue, value } from 'istore';
// импортируем вспомогательную функцию для создания цепочки оборачивания реакт компонентов связанной с каким-либо доменом 
import { lockDomain } from 'istore-react';

// интерфейс элементов списка, в идеале выносить интерфейсы в отдельный файл, но в данном случае я решил оставить его тут
export interface IToDoItem {
  text: string; // текст To Do элемента
  done: boolean; // флаг говорящий о завершенности задачи
}

// изначальное состояние нашего To Do списка
const initialToDoItems: IToDoItem[]  = [
  {
    text: 'Скачать исходники todo-istore',
    done: true,
  },
  {
    text: 'Установить зависимости запустив комманду npm i',
    done: true,
  },
  {
    text: 'Запустить проект запстив комманду npm start',
    done: true,
  },
  {
    text: 'Потыкать кнопочки в приложении',
    done: false,
  }
];

// констната хранящая виды фильтров, в идеале константы лучше выносить в отделный файл, но в данном примере я решил этого не делать
export const FILTERS = {
  ALL: 'ALL', // показывать все элементы To Do списка
  ONLY_DONE: 'ONLY_DONE', // показывать только завершенные элементы To Do списка
  ONLY_UNDONE: 'ONLY_UNDONE',  // показывать только не завершенные элементы To Do списка
};

// создаем функицю для генерации todo юнита. В качестве базового юнита используем listValue юнит
const todo = (initialItems: IToDoItem[]) => listValue<IToDoItem>(initialItems)
// изменяем методы listValue юнита под наши нужды
  .withMethods((methods, { getState }) => ({
    add: methods.add, // оставляем метод добавления элемента в список
    remove: methods.remove, // оставляем метод для удаления элемента из списка
    toggleDone: (item: IToDoItem) => { // добавляем метод для изменения значени флага done в элементе
      // находим индекс элемента в массиве элементов, getState функция для получения текущего списка элементов
      const index = getState().indexOf(item); 
      // вызываем метод для изменения элемента списка, в качестве done передаем противоположное значение от того которое было
      methods.mergeToItem(index, { done: !getState()[index].done });
    },
  }));

// пишем функция для генерации домена для нашей старницы
const getToDoDomain = () => domain({
    list: todo(initialToDoItems), // это будет списко наших To Do
    newItemText: value(''), // это текст для нового элемента
    filter: value(FILTERS.ALL), // это текущий выбранный фильтр
  })
  // теперь расширяем полученный домен методами
  .withMethods((methods, state) => ({
    ...methods, // сохраняем все текущие методы домена

    // добавляем метод для добавения элемента в списко
    addItem: () => {
       // добавляем в список элемент, в качетсве тексат используем текст в newItemText
      methods.list.add({ text: state.newItemText, done: false });
      // очищаем текст в newItemText
      methods.newItemText.set('');
    },

    // добавляем метод для получения видимых в данный момент элементов списка
    getVisibleItems: () => {
      switch (state.filter) {
        case FILTERS.ONLY_DONE:
          return state.list.filter(i => i.done);
        case FILTERS.ONLY_UNDONE:
          return state.list.filter(i => !i.done);
        default:
          return state.list;
      }
    }
  }));

// замыкаем домен для получения функции wrap, с помощью которой мы будем оборачить компоненты
// в качетсве первого аргумента передаем название уникальный в рамках приложения префикс для домена,
// либо функцию которая возвращает такой префикс, например (props: IProps) => `${props.id}_todo`.
// в качестве второго аргумента передаем функцию для получения домена.
export const wrap = lockDomain('todo', getToDoDomain);