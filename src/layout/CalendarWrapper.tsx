import { Paper, PaperProps } from '@mantine/core';
import classes from './CalendarWrapper.module.css';

interface Props extends PaperProps {
	children: React.ReactNode;
}

export function CalendarWrapper({ children, style }: Props) {
	return (
		<Paper style={style} className={classes.wrapper} withBorder shadow='lg'>
			{children}
		</Paper>
	);
}
