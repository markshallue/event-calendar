import { Paper } from '@mantine/core';
import classes from './CalendarWrapper.module.css';

interface Props {
	children: React.ReactNode;
}

export function CalendarWrapper({ children }: Props) {
	return (
		<Paper className={classes.wrapper} withBorder shadow='lg'>
			{children}
		</Paper>
	);
}
