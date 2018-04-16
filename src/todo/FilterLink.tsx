import * as React from 'react';
import { wrap } from './domain';

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

export default wrap.withProps((s, m, { getProps }) => ({
  disabled: getProps().filter === s.filter,
  onClick: () => m.filter.set(getProps().filter),
})).component(Link);
