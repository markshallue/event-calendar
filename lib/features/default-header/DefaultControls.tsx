import { Dispatch, ReactNode, SetStateAction } from 'react';
import classes from './DefaultHeader.module.css';

import { CalendarView } from '~/types';
import { HeaderButton } from './HeaderButton';

interface DefaultControlsProps {
	views: CalendarView[];
	view: CalendarView;
	setView?: Dispatch<SetStateAction<CalendarView>>;
	children: ReactNode;
}

export function DefaultControls({ views, setView = () => null, view, children }: DefaultControlsProps) {
	if (views.length === 0 && !children) return;
	return (
		<div className={classes.controls}>
			{views.length > 0 && (
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
