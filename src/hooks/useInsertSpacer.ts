import * as React from 'react';
import Spacer from '@/components/Spacer';
import { IElement } from '@/providers/rlsProvider.types';
import useSettings from '@/hooks/useSettings';
import _ from 'lodash';

const useInsertSpacer: (children: React.ReactNode, config?: IElement) => React.ReactNode = (
  children,
  config
) => {
  if (!config || !Array.isArray(children)) {
    return children;
  }

  const { direction, spacing, portraitSpacing } = config;
  const spacingSize = direction === 'row' ? spacing : portraitSpacing ?? spacing;

  const settings = useSettings();
  const spaceSize = _.get(settings, 'space.value', 0) * (spacingSize ?? 0);
  const spaceUnit = _.get(settings, 'space.unit', 'px');

  // insert Spacer between each child
  return children.reduce((acc, child, index) => {
    if (index === 0) {
      return acc.concat([child]);
    }
    return acc.concat([
      React.createElement(
        Spacer,
        {
          key: `spacer-${index}`,
          direction,
          size: `${spaceSize}${spaceUnit}`,
        },
        null
      ),
      child,
    ]);
  }, []);
};

export default useInsertSpacer;
