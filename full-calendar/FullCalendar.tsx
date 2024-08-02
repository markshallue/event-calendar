import { useState } from 'react';

import { Header } from '~/features';
import { CalendarEvent } from '~/types';
import { useEventsCalendar, useEventsCalendarProps } from '~/hooks';
import { EventsCalendar, EventsCalendarProps } from '~/EventsCalendar';

import { useGetFilteredEvents } from '@/hooks';
import { HandleSubmitArgs, CalendarFormFields, CalendarGroup } from '@/types';
import { ViewPopover, FormPopover, ContextMenu, FilterControl } from '@/components';

import { EntryLinks } from './components';

interface Props extends EventsCalendarProps {
	groups?: CalendarGroup[];
	editable?: boolean;
	fields: CalendarFormFields;
	handleSubmit?: (args: HandleSubmitArgs) => void;
	withViewLink?: boolean;
	withEditLink?: boolean;
	renderCustomEditControls?: (event: CalendarEvent, type: 'icons' | 'buttons', close: () => void) => React.ReactNode;
	useEventsCalendarProps?: Omit<useEventsCalendarProps, 'isInitialised'>;
}

const defaultFields: CalendarFormFields = {
	start: 'Start',
	multiGroup: false,
};

export function FullCalendar({
	events,
	groups,
	editable,
	fields = defaultFields,
	handleSubmit = () => null,
	withViewLink = false,
	withEditLink = false,
	useEventsCalendarProps,
	renderCustomEditControls,
	...props
}: Props) {
	const [inactiveGroups, setInactiveGroups] = useState<string[]>([]);
	const [popoverType, setPopoverType] = useState<'view' | 'edit' | 'create' | 'reschedule'>('view');

	const calendar = useEventsCalendar(useEventsCalendarProps);

	const filteredEvents = useGetFilteredEvents({ data: events, inactiveGroups });

	const filterControl =
		groups && groups.length > 0 ? (
			<FilterControl
				filterLabel={fields.group}
				items={groups}
				hiddenItems={inactiveGroups}
				setHiddenItems={setInactiveGroups}
			/>
		) : null;

	// Render either links or edit controls in popover and context menu
	const entryLinksProps = { withViewLink: withViewLink, withEditLink: withEditLink };
	const renderPopoverControls = editable
		? undefined
		: (event: CalendarEvent) => <EntryLinks type='icon' id={event.entryId || event.id} {...entryLinksProps} />;
	const renderContextMenuControls = editable
		? undefined
		: (event: CalendarEvent) => <EntryLinks type='button' id={event.entryId || event.id} {...entryLinksProps} />;

	const hideContextMenu = !editable && !withViewLink && !withEditLink;

	return (
		<>
			<Header {...calendar} customControls={filterControl} />
			<div style={{ height: 'calc(100% - 52px)' }}>
				<EventsCalendar
					noHeader
					calendar={calendar}
					events={filteredEvents}
					onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
						if (isDoubleClick) {
							closePopover();
						} else {
							openPopover();
							setPopoverType('view');
						}
					}}
					onEventCreate={({ openPopover }) => {
						openPopover();
						setPopoverType('create');
					}}
					onEventReschedule={({ openPopover }) => {
						openPopover();
						setPopoverType('reschedule');
					}}
					renderPopover={({ clickedEvent, newEvent, onClose }) => {
						return popoverType === 'view' ? (
							<ViewPopover
								editable={editable}
								event={clickedEvent}
								onClose={onClose}
								setPopoverType={setPopoverType}
								handleSubmit={handleSubmit}
								renderPopoverControls={renderPopoverControls}
								renderCustomEditControls={renderCustomEditControls}
							/>
						) : (
							<FormPopover
								event={popoverType === 'edit' ? clickedEvent : newEvent}
								onClose={onClose}
								groups={groups}
								fields={fields}
								handleSubmit={handleSubmit}
								formType={popoverType === 'reschedule' ? 'edit' : popoverType}
							/>
						);
					}}
					renderContextMenu={
						hideContextMenu
							? undefined
							: ({ event, onClose, openPopover, closeContextMenu }) => (
									<ContextMenu
										event={event}
										onClose={onClose}
										openPopover={openPopover}
										closeContextMenu={closeContextMenu}
										setPopoverType={setPopoverType}
										handleSubmit={handleSubmit}
										renderCustomEditControls={renderCustomEditControls}
										renderContextMenuControls={renderContextMenuControls}
									/>
							  )
					}
					{...props}
				/>
			</div>
		</>
	);
}
