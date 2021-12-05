import * as React from 'react';
import Spacer from '@/components/Spacer';
import { IElement, ISettings } from '@/providers/rlsProvider.types';
import useSettings from '@/hooks/useSettings';
import get from 'lodash-es/get';
import { FULL_SPACER } from '@/constants';

// How wide each spacer is
const spacerWide: (settings: ISettings, spacing?: number) => string = (settings, spacing) => {
  const spaceSize = get(settings, 'space.value', 0) * (spacing ?? 0);
  const spaceUnit = get(settings, 'space.unit', 'px');

  return `${spaceSize}${spaceUnit}`;
};

const orderChildren: (children: any[], config: IElement) => React.ReactNode[] = (
  children,
  config
) => {
  const { order } = config;
  if (!order) {
    return children;
  }

  return order
    .map((key: string) => {
      const child = children.find((child: any) => child.props.typeKey === key);
      if (!child) {
        return null;
      }

      return child;
    })
    .filter((child: any) => !!child);
};

const insertSpacerBetweenEachChild: (
  children: any[],
  spacerWide: string,
  config: IElement
) => React.ReactNode[] = (children, spacerWide, config) => {
  const { direction, splitAt } = config;
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
          size: child.props.typeKey === splitAt ? FULL_SPACER : spacerWide,
        },
        null
      ),
      child,
    ]);
  }, []);
};

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

  return insertSpacerBetweenEachChild(
    orderChildren(children, config),
    spacerWide(settings, spacingSize),
    config
  );
};

export default useInsertSpacer;
