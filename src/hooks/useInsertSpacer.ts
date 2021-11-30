import * as React from 'react';
import Spacer from '@/components/Spacer';
import { IElement, ISettings } from '@/providers/rlsProvider.types';
import useSettings from '@/hooks/useSettings';
import _ from 'lodash';
import { FULL_SPACER } from '@/constants';

// How wide each spacer is
const spacerSize: (settings: ISettings, spacing?: number) => string = (settings, spacing) => {
  const spaceSize = _.get(settings, 'space.value', 0) * (spacing ?? 0);
  const spaceUnit = _.get(settings, 'space.unit', 'px');

  return `${spaceSize}${spaceUnit}`;
};

const useInsertSpacer: (children: React.ReactNode, config?: IElement) => React.ReactNode = (
  children,
  config
) => {
  if (!config || !Array.isArray(children)) {
    return children;
  }

  const { direction, spacing, portraitSpacing, splitAt } = config;

  const spacingSize = direction === 'row' ? spacing : portraitSpacing ?? spacing;
  const settings = useSettings();

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
          size: child.props.typeKey === splitAt ? FULL_SPACER : spacerSize(settings, spacingSize),
        },
        null
      ),
      child,
    ]);
  }, []);
};

export default useInsertSpacer;
