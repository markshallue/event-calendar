import { Dispatch, useEffect } from 'react';
import {
	useFloating,
	autoPlacement,
	offset,
	detectOverflow,
	autoUpdate,
	hide,
	ElementRects,
	Elements,
	MiddlewareData,
	Placement,
	Strategy,
} from '@floating-ui/react-dom';
import { CalendarAction } from '~/types';
import { Platform } from '@floating-ui/core';

// Constants
const PADDING = 32;
const PADDING_X = 32;
const PADDING_Y = 16;

interface useBindPopoverProps {
	anchor: Element;
	dispatch: Dispatch<CalendarAction>;
}

export function useBindPopover({ anchor, dispatch }: useBindPopoverProps) {
	const preventViewportOverflow = {
		name: 'preventViewportOverflow',
		async fn(state: {
			platform: Platform;
			placement: Placement;
			strategy: Strategy;
			x: number;
			y: number;
			initialPlacement: Placement;
			middlewareData: MiddlewareData;
			rects: ElementRects;
			elements: Elements;
		}) {
			const overflow = await detectOverflow(state);

			// If overflows > 0 (there is an overflow), recalculate position
			let xPosition = state.x;
			if (overflow.left > 0) xPosition = state.x + overflow.left + PADDING_X;
			if (overflow.right > 0) xPosition = state.x - overflow.right - PADDING_X;

			let yPosition = state.y;
			if (overflow.top > 0) yPosition = state.y + overflow.top + PADDING_Y;
			if (overflow.bottom > 0) yPosition = state.y - overflow.bottom - PADDING_Y;

			// If reference el hidden (due to scrolling), only reassign x position
			if (state.middlewareData.hide?.referenceHidden) return { ...state, x: xPosition };

			return { ...state, x: xPosition, y: yPosition };
		},
	};

	const { refs, floatingStyles } = useFloating({
		elements: {
			reference: anchor,
		},
		placement: 'bottom',
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
		middleware: [
			hide(),
			offset(8),
			autoPlacement({
				crossAxis: true,
				padding: PADDING,
			}),
			preventViewportOverflow,
		],
	});

	// Close popover of click outside of the react component
	useEffect(() => {
		const handleClose = () => {
			dispatch({ type: 'reset_to_default' });
		};
		window.addEventListener('click', handleClose);
		return () => {
			window.removeEventListener('click', handleClose);
		};
	}, [dispatch]);

	return { refs, floatingStyles };
}
