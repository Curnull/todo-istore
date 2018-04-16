import { domain, listValue, value } from 'istore';
import { lockDomain } from 'istore-react';

export interface IToDoItem {
  text: string;
  done: boolean;
}

export const FILTERS = {
  ALL: 'ALL',
  ONLY_DONE: 'ONLY_DONE',
  ONLY_UNDONE: 'ONLY_UNDONE', 
};

const toDoUnit = () => listValue<IToDoItem>().withMethods((m, { getState }) => ({
  add: m.add,
  remove: m.remove,
  toggleDone: (item: IToDoItem) => {
    const index = getState().indexOf(item);
    m.mergeToItem(index, { done: !getState()[index].done });
  },
}));

const getToDoDomain = () => domain({
  list: toDoUnit(),
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