import { ReactNode } from 'react';
import { CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';

import { CalendarGroup } from '@/types';

import { DropdownItem } from './DropdownItem';

interface GroupMultiSelectProps {
	disabled?: boolean;
	error: ReactNode;
	groups: CalendarGroup[];
	label: string;
	handleItemRemove: (item: string) => void;
	handleItemSelect: (item: string) => void;
	value: string[];
}

export function GroupMultiSelect({
	disabled,
	error,
	groups,
	label,
	handleItemRemove,
	handleItemSelect,
	value,
}: GroupMultiSelectProps) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
	});

	const values = value.map(item => (
		<Pill key={item} withRemoveButton onRemove={() => handleItemRemove(item)}>
			<span style={{ fontSize: '0.75rem' }}>{item}</span>
		</Pill>
	));

	const options = groups.map(item => (
		<Combobox.Option value={item.label} key={item.label} active={value.includes(item.label)}>
			<Group gap='sm'>
				{value.includes(item.label) ? <CheckIcon size={12} /> : null}
				<DropdownItem label={item.label} color={item.color} />
			</Group>
		</Combobox.Option>
	));

	return (
		<Combobox disabled={disabled} store={combobox} onOptionSubmit={handleItemSelect} withinPortal={false} shadow='md'>
			<Combobox.DropdownTarget>
				<PillsInput
					pointer
					onClick={() => combobox.toggleDropdown()}
					label={label}
					disabled={disabled}
					description={disabled ? 'RelatedForm must be set in calendar config' : null}
					size='xs'
					error={error}
					rightSection={<Combobox.Chevron />}
				>
					<Pill.Group>
						{values.length > 0 ? values : <Input.Placeholder>Select one or more</Input.Placeholder>}

						<Combobox.EventsTarget>
							<PillsInput.Field
								type='hidden'
								onBlur={() => combobox.closeDropdown()}
								onKeyDown={event => {
									if (event.key === 'Backspace') {
										event.preventDefault();
										handleItemRemove(value[value.length - 1]);
									}
								}}
							/>
						</Combobox.EventsTarget>
					</Pill.Group>
				</PillsInput>
			</Combobox.DropdownTarget>

			<Combobox.Dropdown>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
