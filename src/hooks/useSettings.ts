import { RLSProviderContext } from '@/providers/RLSProvider';
import { useContext } from 'react';

const useSettings = () => {
  return useContext(RLSProviderContext).themes.settings;
};

export default useSettings;
