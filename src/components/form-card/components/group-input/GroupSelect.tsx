// import { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import { CalendarGroup } from '../../types';
import { ReactNode } from 'react';
import { DropdownItem } from './DropdownItem';

interface GroupSelectProps {
	disabled?: boolean;
	error: ReactNode;
	groups: CalendarGroup[];
	label: string;
	onChange: (groupsArray: string[]) => void;
	value: string[];
}

export function GroupSelect({ disabled, error, groups, label, onChange, value }: GroupSelectProps) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const selectedGroup = groups.find(group => group.label === value[0]);

	const options = groups.map(item => (
		<Combobox.Option value={item.label} key={item.label}>
			<DropdownItem label={item.label} color={item.color} />
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={val => {
				onChange([val].flat());
				combobox.closeDropdown();
			}}
			shadow='md'
		>
			<Combobox.Target>
				<InputBase
					label={label}
					disabled={disabled}
					description={disabled ? 'RelatedForm must be set in calendar config' : null}
					component='button'
					type='button'
					pointer
					rightSection={<Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					size='xs'
					rightSectionPointerEvents='none'
					error={error}
				>
					{selectedGroup ? (
						<DropdownItem label={selectedGroup.label} color={selectedGroup.color} />
					) : (
						<Input.Placeholder>Select one</Input.Placeholder>
					)}
				</InputBase>
			</Combobox.Target>
			<Combobox.Dropdown>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
