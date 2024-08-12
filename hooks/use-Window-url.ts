import { useEffect, useState } from 'react';
import  useIsMounted  from './use-is-mounted';

const useWindowUrl = () => {
  const isMounted = useIsMounted();
  const [getUrl, setUrl] = useState<Location | null>(null);

  useEffect(() => {
    if (isMounted) {
      setUrl(window.location);
    }
  }, [isMounted]);

  return getUrl;
};

export default useWindowUrl;
