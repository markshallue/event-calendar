import { CalendarGroup, FormCardReturnValues } from '@/components/form-card/types';
import { RawCalendarEvent } from '~/types';

type createNewEventFromFormArgs =
	| {
			type: 'create';
			values: FormCardReturnValues;
			groups: CalendarGroup[];
			id: number;
	  }
	| {
			type: 'edit';
			values: FormCardReturnValues;
			groups: CalendarGroup[];
			event: RawCalendarEvent;
	  };

export const createNewEventFromForm = (args: createNewEventFromFormArgs): RawCalendarEvent => {
	const groupToColorMap: Record<string, string> = args.groups.reduce(
		(a, c) => ({
			...a,
			[c.label]: c.color,
		}),
		{}
	);

	console.log(args.values);

	const commonProps = {
		...args.values,
		groups: args.values.groups.map(groupLabel => ({ label: groupLabel, color: groupToColorMap[groupLabel] })),
	};

	if (args.type === 'create') {
		return {
			id: args.id,
			...commonProps,
		};
	}
	return {
		...args.event,
		...commonProps,
	};
};
