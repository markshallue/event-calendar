import { ReactNode } from 'react';
import { ScrollArea } from '@mantine/core';

import classes from './PageWrapper.module.css';

export function PageWrapper({ children }: { children: ReactNode }) {
	return (
		<ScrollArea pos='relative' h='calc(100vh - 60px)' bg='var(--mantine-color-gray-0)'>
			<div className={classes.wrapper}>{children}</div>
		</ScrollArea>
	);
}
