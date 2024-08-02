import { Card, Text, Badge, ScrollArea, Stack, Group } from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons-react';
import classes from './ViewPopover.module.css';

import { EventActions } from '@/components';

import { CalendarEvent } from '~/types';
import { humanize, getDateTimeLabel } from '@/utils';

import { FilledBadge, ImageCarousel } from './components';

interface ViewPopoverProps {
	onClose: () => void;
	event: CalendarEvent;
	editable?: boolean;
	renderPopoverControls?: (event: CalendarEvent) => React.ReactNode;
	renderCustomEditControls?: (event: CalendarEvent, type: 'icons' | 'buttons', close: () => void) => React.ReactNode;
	setPopoverType?: (type: 'view' | 'edit') => void;
	handleSubmit?: (args: any) => void;
}

export function ViewPopover({
	onClose,
	setPopoverType,
	editable = false,
	renderPopoverControls,
	renderCustomEditControls,
	handleSubmit,
	event,
}: ViewPopoverProps) {
	if (!event) return <></>;
	const timeLabel = getDateTimeLabel(event.start, event.end, event.startTime, event.endTime);

	// Toolbar visibility
	const showBadge = event.groups && event.groups.length !== 0;
	const showToolbar = showBadge || editable || renderPopoverControls;

	return (
		<Card className={classes.ViewPopover} padding={0} withBorder>
			{/* Image carousel */}
			{event.images && event.images.length > 0 && <ImageCarousel images={event.images} />}

			{/* Other content */}
			<div className={classes.ViewPopoverSection}>
				{/* Heading */}
				<Text fw={700} className={classes.title} size='md' lh='xs'>
					{event.title}
				</Text>

				{/* Time Label */}
				{timeLabel && (
					<div className={classes.timeLabel}>
						<IconCalendarEvent color='#858E96' size={14} stroke={2.5} />
						<Text c='dimmed' fw={600} mt={1} size='xs'>
							{timeLabel}
						</Text>
					</div>
				)}

				{/* Content */}
				{event.content && event.content?.length > 0 && (
					<ScrollArea.Autosize mah={220} style={{ marginTop: '0.5rem' }}>
						<Stack gap='sm'>
							{event.content.map(({ label, content }, i) => (
								<div key={i}>
									<Text c='dark' fw={600} size='sm'>
										{humanize(label)}:
									</Text>
									{Array.isArray(content) ? (
										<div
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: '0.25rem',
												marginTop: '0.25rem',
											}}
										>
											<>
												{content.slice(0, 5).map((item, index) => (
													<Badge key={index} radius='sm' size='sm' variant='outline'>
														{typeof item === 'string' ? item : item.label}
													</Badge>
												))}
												{content.length > 5 && (
													<Badge radius='sm' size='sm' variant='outline'>
														+{content.length - 5} more
													</Badge>
												)}
											</>
										</div>
									) : (
										<Text className={classes.infoField} size='sm'>
											{content}
										</Text>
									)}
								</div>
							))}
						</Stack>
					</ScrollArea.Autosize>
				)}
			</div>

			{/* Toolbar */}
			{showToolbar && (
				<Group px='md' py='xs' style={{ flexShrink: 0, borderTop: '1px solid var(--mantine-color-gray-3)' }}>
					{showBadge && <FilledBadge event={event} />}

					<Group gap='0.25rem' justify='flex-end' style={{ flexGrow: 1 }}>
						{renderPopoverControls ? (
							renderPopoverControls(event)
						) : editable ? (
							<EventActions
								onClose={onClose}
								setPopoverType={setPopoverType}
								event={event}
								handleSubmit={handleSubmit}
								renderCustomEditControls={renderCustomEditControls}
								type='icons'
							/>
						) : null}
					</Group>
				</Group>
			)}
		</Card>
	);
}
