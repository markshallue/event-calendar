import { ScrollArea } from '@mantine/core';
import { pages } from '@/config/pages';

import classes from './Navbar.module.css';

import { LinksGroup } from './NavbarLinksGroup';

export function Navbar() {
  const links = pages.map((page) => <LinksGroup {...page} key={page.label} />);

  return (
    <div className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </div>
  );
}
