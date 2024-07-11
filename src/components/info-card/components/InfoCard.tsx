import { Card, Text, Badge, ScrollArea, Stack } from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons-react';
import classes from './InfoCard.module.css';

import { ImageCarousel } from '@/components';

import { humanize, getDateTimeLabel } from '~/utils';

import { InfoCardToolbar } from './InfoCardToolbar';
import { EventsCalendarPopoverProps } from '~/types';

interface InfoCardProps extends EventsCalendarPopoverProps {
	handleSubmit: (args: any) => void;
	withViewLink?: boolean;
	withEditLink?: boolean;
	editable?: boolean;
}

export function InfoCard({
	onClose,
	setPopoverType,
	withViewLink = true,
	withEditLink = true,
	editable = false,
	handleSubmit,
	event,
}: InfoCardProps) {
	const timeLabel = getDateTimeLabel(event.start, event.end, event.startTime, event.endTime);

	return (
		<Card className={classes.infoCard} padding={0} withBorder>
			{/* Image carousel */}
			{event.images && event.images.length > 0 && <ImageCarousel images={event.images} />}

			{/* Other content */}
			<div className={classes.infoCardSection}>
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
			{/* Bottom Toolbar */}
			<InfoCardToolbar
				withViewLink={withViewLink}
				withEditLink={withEditLink}
				editable={editable}
				onClose={onClose}
				setPopoverType={setPopoverType}
				event={event}
				handleSubmit={handleSubmit}
			/>
		</Card>
	);
}
