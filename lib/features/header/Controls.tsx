import { Dispatch, ReactNode, SetStateAction } from 'react';
import classes from './Header.module.css';

import { CalendarView } from '~/types';
import { HeaderButton } from './HeaderButton';

interface ControlsProps {
	hideViewToggle?: boolean;
	views: CalendarView[];
	view: CalendarView;
	setView?: Dispatch<SetStateAction<CalendarView>>;
	children: ReactNode;
}

export function Controls({ hideViewToggle, views, setView = () => null, view, children }: ControlsProps) {
	if (views.length === 0 && !children) return;
	return (
		<div className={classes.controls}>
			{!hideViewToggle && views.length > 0 && (
				<div style={{ display: 'flex' }}>
					{views.map((viewLabel, i) => (
						<HeaderButton
							key={viewLabel}
							isFirst={i === 0 && views.length > 1}
							isMiddle={i > 0 && i < views.length - 1}
							isLast={i === views.length - 1}
							active={view === viewLabel}
							onClick={() => setView(viewLabel)}
						>
							{viewLabel}
						</HeaderButton>
					))}
				</div>
			)}
			{children}
		</div>
	);
}
