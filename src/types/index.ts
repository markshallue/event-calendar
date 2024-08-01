import { FormPopoverReturnValues } from '@/components/form-popover/types';

export type HandleSubmitArgs =
	| {
			type: 'delete';
			id: number | null;
	  }
	| {
			id: number | null;
			type: 'create' | 'edit';
			values: FormPopoverReturnValues;
	  };

export type CalendarFormFields = {
	start?: string;
	end?: string;
	group?: string;
	info?: string;
	multiGroup?: boolean;
};

export type CalendarGroup = {
	id: number;
	label: string;
	color: string;
};
