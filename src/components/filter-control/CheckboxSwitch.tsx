import { Badge, Checkbox, UnstyledButton } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import classes from './CheckboxSwitch.module.css';

type CheckboxSwitchProps = {
	checked: boolean;
	label: string;
	color?: string;
	withShowOnly?: boolean;
	hideLayer: () => void;
	showOnlyThisItem?: () => void;
};

const CheckboxIcon = ({ className }: { className: string }) => (
	<IconCheck className={className} stroke={3} style={{ width: 16, height: 16 }} />
);

export function CheckboxSwitch({
	checked,
	label,
	color = 'blue.7',
	hideLayer,
	withShowOnly,
	showOnlyThisItem = () => null,
}: CheckboxSwitchProps) {
	return (
		<UnstyledButton
			className={classes.button}
			onClick={hideLayer}
			style={{ position: 'relative', maxWidth: '100%', overflow: 'hidden' }}
		>
			<Checkbox
				checked={checked}
				icon={CheckboxIcon}
				label={label}
				color={color}
				onChange={() => {}}
				style={{ userSelect: 'none' }}
				styles={{
					root: {
						padding: '0.5rem 1rem',
						alignItems: 'center',
						maxWidth: 'calc(16rem - 1px)',
					},
					body: {
						maxWidth: 'calc(100% - 1rem)',
					},
					labelWrapper: { cursor: 'pointer', width: '100%', lineHeight: '18px' },
					label: {
						pointerEvents: 'none',
						paddingLeft: '0.75rem',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
					},
					input: {
						cursor: 'pointer',
						borderWidth: 2,
						borderRadius: 3,
						flexShrink: 0,
						width: '1.125rem',
						height: '1.125rem',
						margin: 0,
					},
					inner: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '1.125rem',
						height: '1.125rem',
					},
				}}
			/>
			{withShowOnly && (
				<Badge
					className={classes.showOnly}
					onClick={e => {
						e.stopPropagation();
						showOnlyThisItem();
					}}
					radius='sm'
					size='sm'
					variant='default'
				>
					Only
				</Badge>
			)}
		</UnstyledButton>
	);
}
