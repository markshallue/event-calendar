import { ReactNode } from 'react';
import classes from './PageWrapper.module.css';

export function PageWrapper({ children }: { children: ReactNode }) {
  return <div className={classes.wrapper}>{children}</div>;
}
