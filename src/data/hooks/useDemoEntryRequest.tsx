import { useEffect, useMemo, useState } from 'react';
import createDemoEntry from '../createDemoEntry';

export default function useDemoEntryRequest(index: number) {
  const [isLoading, setIsLoading] = useState(true);

  const demoEntry = useMemo(() => createDemoEntry(index), [index]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  return { data: isLoading ? undefined : demoEntry, isLoading };
}
