import * as React from 'react';
import { Themes } from './rlsProvider.types';

interface IRLSProviderProps {
  children: React.ReactNode;
  themes: Themes;
}

interface IRLSProviderContext {
  themes: Themes;
}

export const RLSProviderContext = React.createContext<IRLSProviderContext>({
  themes: {
    settings: {
      space: {
        value: 0.25,
        unit: 'rem',
      },
    },
    elements: [],
  },
});

const RLSProvider: React.FC<IRLSProviderProps> = (props) => {
  const { children, themes } = props;

  return <RLSProviderContext.Provider value={{ themes }}>{children}</RLSProviderContext.Provider>;
};

export default RLSProvider;
