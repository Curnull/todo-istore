import * as React from 'react';
import { wrap, FILTERS } from './domain';

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

const FilterLink = wrap.withProps((s, m, { getProps }) => ({
  disabled: getProps().filter === s.filter,
  onClick: () => m.filter.set(getProps().filter),
})).component(Link);

export default () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={FILTERS.ALL}>
      All
    </FilterLink>
    <FilterLink filter={FILTERS.ONLY_UNDONE}>
      Active
    </FilterLink>
    <FilterLink filter={FILTERS.ONLY_DONE}>
      Completed
    </FilterLink>
  </div>
);
