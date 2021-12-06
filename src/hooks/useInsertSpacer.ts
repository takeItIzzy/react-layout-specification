import * as React from 'react';
import Spacer from '@/components/Spacer';
import { IElement, ISettings } from '@/providers/rlsProvider.types';
import useSettings from '@/hooks/useSettings';
import get from 'lodash-es/get';
import { FULL_SPACER } from '@/constants';
import isNil from 'lodash-es/isNil';

// How wide each spacer is
const spacerWide: (settings: ISettings, spacing?: number) => string = (settings, spacing) => {
  const spaceSize = get(settings, 'space.value', 0) * (spacing ?? 0);
  const spaceUnit = get(settings, 'space.unit', 'px');

  return `${spaceSize}${spaceUnit}`;
};

const filterValidElements = (children: any) => {
  return children.filter((child: any) => {
    return React.isValidElement(child);
  });
};

const flatChildrenByFragment = (children: any) => {
  return filterValidElements(children).reduce((acc: any[], child: any) => {
    if (child.type === React.Fragment) {
      return [
        ...acc,
        ...flatChildrenByFragment(
          Array.isArray(child.props.children) ? child.props.children : [child.props.children]
        ),
      ];
    }

    return [...acc, child];
  }, []);
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
      const child = children.find((child: any) => child?.props.typeKey === key);
      if (!child) {
        return null;
      }

      return child;
    })
    .filter((child: any) => !!child);
};

const elementsBehindSplitAt = (config: IElement) => {
  const { splitAt, order } = config;
  const index = order?.findIndex((key: string) => key === splitAt);
  if (isNil(index) || index === -1 || isNil(order)) {
    return [];
  }
  return order.slice(index);
};

const insertSpacerBetweenEachChild: (
  children: any[],
  spacerWide: string,
  config: IElement
) => React.ReactNode[] = (children, spacerWide, config) => {
  const { direction } = config;
  let hasSetFullSpacer = false;

  return children.reduce((acc, child, index) => {
    const isInEndChild = elementsBehindSplitAt(config).includes(child.props.typeKey);
    if (index === 0 && !isInEndChild) {
      return acc.concat([child]);
    }
    const next = acc.concat([
      React.createElement(
        Spacer,
        {
          key: `spacer-${index}`,
          direction,
          size: isInEndChild && !hasSetFullSpacer ? FULL_SPACER : spacerWide,
        },
        null
      ),
      child,
    ]);

    if (isInEndChild) {
      hasSetFullSpacer = true;
    }

    return next;
  }, []);
};

const useInsertSpacer: (children: any, config?: IElement) => React.ReactNode = (
  children,
  config
) => {
  if (!config) {
    return children;
  }

  const { direction, spacing, portraitSpacing } = config;

  const spacingSize = direction === 'row' ? spacing : portraitSpacing ?? spacing;
  const settings = useSettings();

  return insertSpacerBetweenEachChild(
    orderChildren(flatChildrenByFragment(Array.isArray(children) ? children : [children]), config),
    spacerWide(settings, spacingSize),
    config
  );
};

export default useInsertSpacer;
