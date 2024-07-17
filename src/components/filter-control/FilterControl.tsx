import { ActionIcon, Anchor, Group, Indicator, Popover, ScrollArea, Stack, Text } from '@mantine/core';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';

import { CheckboxSwitch } from './CheckboxSwitch';

type FilterItem = {
	label: string;
	id: number;
	color: string;
};

interface LayerFilterControlProps {
	filterLabel?: string;
	items: FilterItem[];
	hiddenItems: string[];
	setHiddenItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FilterControl({ filterLabel = 'Groups', items, hiddenItems, setHiddenItems }: LayerFilterControlProps) {
	if (!items || items.length === 0) return;

	// Handlers
	const filtersActive = hiddenItems.length > 0;
	const showOnlyThisItem = (layerToInclude: string) => {
		setHiddenItems(items.filter(l => l.label !== layerToInclude).map(l => l.label));
	};
	const showAllLayers = () => setHiddenItems([]);

	return (
		<Popover position='bottom-end' shadow='md' withinPortal={false}>
			<Popover.Target>
				<Indicator
					color='pink'
					disabled={!hiddenItems || hiddenItems.length === 0}
					offset={7}
					size={7}
					style={{ height: 32 }}
				>
					<ActionIcon pos='relative' color='blue' size={32} variant='subtle' style={{ color: '#228be6 !important' }}>
						<IconAdjustmentsHorizontal size='1.375rem' />
					</ActionIcon>
				</Indicator>
			</Popover.Target>
			<Popover.Dropdown p='0.25rem 0' style={{ overflowY: 'hidden' }} miw={180} mah='calc(100% - 80px)'>
				<Group gap='md' justify='space-between'>
					<Text pl='sm' py='0.25rem' size='xs' c='dimmed' fw={500}>
						{filterLabel}
					</Text>
					<Anchor
						pr='xs'
						py='0.25rem'
						size='0.65rem'
						style={{
							userSelect: 'none',
							pointerEvents: filtersActive ? 'auto' : 'none',
							visibility: filtersActive ? 'visible' : 'hidden',
						}}
						onClick={showAllLayers}
					>
						Show all
					</Anchor>
				</Group>
				<ScrollArea.Autosize mah={300}>
					<Stack gap='0'>
						{items.map(({ label, color }, index) => (
							<CheckboxSwitch
								key={index}
								label={label}
								color={color}
								hideLayer={() => {
									setHiddenItems(prev => (prev.includes(label) ? prev.filter(layer => layer !== label) : [...prev, label]));
								}}
								showOnlyThisItem={() => showOnlyThisItem(label)}
								checked={!hiddenItems.includes(label)}
								withShowOnly
							/>
						))}
					</Stack>
				</ScrollArea.Autosize>
			</Popover.Dropdown>
		</Popover>
	);
}
