import { useEffect, useState } from 'react';
import { STATUS_OPTIONS } from '../STATUS_OPTIONS';

export default function useDemoGroupsRequest(delay?: number) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, [setIsLoading, delay]);

  return { data: isLoading ? undefined : STATUS_OPTIONS, isLoading };
}
