import { ReactNode } from 'react';
import classes from './HeaderButton.module.css';

interface HeaderButtonProps {
	isFirst?: boolean;
	isMiddle?: boolean;
	isLast?: boolean;
	active?: boolean;
	onClick?: () => void;
	variant?: 'outline' | 'subtle';
	children: ReactNode;
}

export function HeaderButton({
	isFirst,
	isMiddle,
	isLast,
	active = false,
	onClick = () => null,
	variant,
	children,
}: HeaderButtonProps) {
	return (
		<button
			type='button'
			onClick={onClick}
			data-first={isFirst}
			data-middle={isMiddle}
			data-last={isLast}
			data-active={active}
			data-variant={variant}
			className={classes.button}
		>
			{children}
		</button>
	);
}
