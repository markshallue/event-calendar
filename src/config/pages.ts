import { IconCalendarEvent, IconHome } from '@tabler/icons-react';

export const pages = [
	{ label: 'Home', icon: IconHome, link: '/' },
	// { label: 'Getting started', icon: IconCompass, link: '/' },
	// { label: 'Styling', icon: IconBrush, link: '/' },
	{
		label: 'Examples',
		icon: IconCalendarEvent,
		initiallyOpened: true,
		links: [
			{ label: 'Basic usage', link: '/basic' },
			{ label: 'Responsive', link: '/responsive' },
			{ label: 'Asynchronous data loading', link: '/async' },
			{ label: 'Popovers', link: '/popovers' },
			{ label: 'Custom header', link: '/custom-header' },
			{ label: 'Edit & delete events', link: '/editable' },
			{ label: 'Drag-n-drop rescheduling', link: '/drag-n-drop' },
			{ label: 'Kitchen sink', link: '/kitchen-sink' },
		],
	},
	// { label: 'Support', icon: IconHeart, link: '/' },
];
