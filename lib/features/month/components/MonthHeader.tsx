import classes from '../Month.module.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface MonthHeaderProps {
	isCompact: boolean;
}

export function MonthHeader({ isCompact }: MonthHeaderProps) {
	return (
		<div className={classes.monthHeader} data-sm={isCompact}>
			{DAYS.map((day, i) => (
				<div className={classes.headerCell} key={i}>
					{day}
				</div>
			))}
		</div>
	);
}
