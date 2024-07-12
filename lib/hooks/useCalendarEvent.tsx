import { Dispatch, MouseEvent, RefObject, useState } from 'react';
import { useFloating, autoUpdate, flip, offset, shift, useDismiss, useInteractions } from '@floating-ui/react';
import { CalendarEvent, CalendarAction, CalendarState } from '~/types';

interface useCalendarEventProps {
	dispatch: Dispatch<CalendarAction>;
	event: CalendarEvent;
	isInOverflow: boolean;
	hasContextMenu: boolean;
	state: CalendarState;
}

export function useCalendarEvent({ dispatch, event, isInOverflow, hasContextMenu, state }: useCalendarEventProps) {
	// Context menu state
	const [contextIsOpen, setContextIsOpen] = useState(false);
	const closeContextMenu = () => setContextIsOpen(false);

	// Constants
	const isActive = event.id !== null && state.clickedEvent?.id === event.id;

	const { refs, floatingStyles, context } = useFloating({
		open: contextIsOpen,
		onOpenChange: setContextIsOpen,
		middleware: [
			offset({ mainAxis: 5, alignmentAxis: 4 }),
			flip({
				fallbackPlacements: ['left-start'],
			}),
			shift({ padding: 10 }),
		],
		placement: 'right-start',
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
	});

	const dismiss = useDismiss(context);

	const { getFloatingProps } = useInteractions([dismiss]);

	// Handle event right click (context menu)
	const handleContextMenu = (e: MouseEvent, eventRef: RefObject<HTMLDivElement>) => {
		if (!hasContextMenu) return;
		e.preventDefault();

		if (state.popoverDisplayType !== 'hidden' || (state.overflowIsOpen && !isInOverflow)) return;

		refs.setPositionReference({
			getBoundingClientRect() {
				return {
					width: 0,
					height: 0,
					x: e.clientX,
					y: e.clientY,
					top: e.clientY,
					right: e.clientX,
					bottom: e.clientY,
					left: e.clientX,
				};
			},
		});

		dispatch({ type: 'open_context_menu', event: event, anchor: eventRef.current });
		setContextIsOpen(true);
	};

	// Handle event left click (info popover)
	const handleClick = (e: MouseEvent, isPlaceholder: boolean, eventRef: RefObject<HTMLDivElement>) => {
		e.stopPropagation();
		if (isPlaceholder) return;

		if (!eventRef.current) return;

		// Check if popover is open and anchored to the clicked event, we want to
		// move the popover if the event is clicked twice, but on different weeks)
		const popoverIsAnchored = isActive && state.eventAnchor?.dataset.anchorday === eventRef.current.dataset.anchorday;

		// Overflow popover should close if clicked event was not inside the overflow popover
		const overflowShouldClose = !isInOverflow && state.overflowIsOpen;

		// Close popover (this is either a double-click on an open event or an event outside the popover)
		if (popoverIsAnchored || overflowShouldClose) dispatch({ type: 'reset_to_default' });

		// Open popover if there is currently no anchored popover
		if (!popoverIsAnchored) dispatch({ type: 'view_calendar_event', event: event, anchor: eventRef.current });
	};
	return {
		handleClick,
		handleContextMenu,
		isActive,
		contextIsOpen,
		refs,
		floatingStyles,
		getFloatingProps,
		closeContextMenu,
	};
}
