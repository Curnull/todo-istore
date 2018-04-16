import { domain, listValue, value } from 'istore';
import { lockDomain } from 'istore-react';

export interface IToDoItem {
  text: string;
  done: boolean;
}

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
export const FILTERS = {
  ALL: 'ALL',
  ONLY_DONE: 'ONLY_DONE',
  ONLY_UNDONE: 'ONLY_UNDONE', 
};

const toDoUnit = (initialItems: IToDoItem[]) => listValue<IToDoItem>(initialItems).withMethods((m, { getState }) => ({
  add: m.add,
  remove: m.remove,
  toggleDone: (item: IToDoItem) => {
    const index = getState().indexOf(item);
    m.mergeToItem(index, { done: !getState()[index].done });
  },
}));

const getToDoDomain = () => domain({
  list: toDoUnit(initialToDoItems),
  newItemText: value(''),
  filter: value(FILTERS.ALL),
}).withMethods((m, s) => ({
  ...m,
  addItem: () => {
    m.list.add({ text: s.newItemText, done: false });
    m.newItemText.set('');
  },
  getVisibleItems: () => {
    switch (s.filter) {
      case FILTERS.ONLY_DONE:
        return s.list.filter(i => i.done);
      case FILTERS.ONLY_UNDONE:
        return s.list.filter(i => !i.done);
      default:
        return s.list;
    }
  }
}));

export const wrap = lockDomain('todo', getToDoDomain);