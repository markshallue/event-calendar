import { useEffect, useState } from 'react';
import form from '../form.json';

export default function useDemoFormRequest() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  return { data: isLoading ? undefined : form, isLoading };
}
