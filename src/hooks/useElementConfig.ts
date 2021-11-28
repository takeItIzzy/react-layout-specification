import { RLSProviderContext } from '@/providers/RLSProvider';
import * as React from 'react';
import { ThemeType } from '@/components/index.types';

const { useContext } = React;

const useElementConfig = (typeKey: ThemeType) => {
  const { themes } = useContext(RLSProviderContext);

  const elementIndex = themes.elements.findIndex((item) => item.typeKey === typeKey);

  if (elementIndex !== -1) {
    return themes.elements[elementIndex];
  }

  console.error(`Theme with typeKey ${typeKey} not found`);
};

export default useElementConfig;
