import { useEffect, useState } from 'react';
import { STAFF_OPTIONS } from '../constants/STAFF_OPTIONS';

export default function useDemoFiltersRequest(delay?: number) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, delay);
	}, [setIsLoading, delay]);

	return { data: isLoading ? undefined : STAFF_OPTIONS, isLoading };
}
