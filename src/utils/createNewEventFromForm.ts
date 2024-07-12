import { CalendarGroup, FormCardReturnValues } from '@/components/form-card/types';
import { RawCalendarEvent } from '~/types';
import { createDayjsObjFromTime } from '~/utils';

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

	const { start, end } = createDayjsObjFromTime(
		args.values.startTime,
		args.values.endTime,
		args.values.start.format('DD-MMM-YYYY'),
		args.values.end.format('DD-MMM-YYYY')
	);

	const commonProps = {
		...args.values,
		groups: args.values.groups.map(groupLabel => ({ label: groupLabel, color: groupToColorMap[groupLabel] })),
		start,
		end,
		isAllDay: args.values.startTime === null && args.values.endTime === null,
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
