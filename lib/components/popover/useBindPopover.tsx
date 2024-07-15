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
import { Platform } from '@floating-ui/core';

// Constants
const padding = 32;
const padding_x = 32;
const padding_y = 16;

interface useBindPopoverProps {
	anchor: Element | null;
}

export function useBindPopover({ anchor }: useBindPopoverProps) {
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
			if (overflow.left > 0) xPosition = state.x + overflow.left + padding_x;
			if (overflow.right > 0) xPosition = state.x - overflow.right - padding_x;

			let yPosition = state.y;
			if (overflow.top > 0) yPosition = state.y + overflow.top + padding_y;
			if (overflow.bottom > 0) yPosition = state.y - overflow.bottom - padding_y;

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
				padding: padding,
			}),
			preventViewportOverflow,
		],
	});

	return { refs, floatingStyles };
}
