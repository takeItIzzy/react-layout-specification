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
    const childrenValid = (c: any) => {
      return (
        React.isValidElement(c.props.children) ||
        typeof c.props.children === 'string' ||
        Array.isArray(c.props.children)
      );
    };

    /**
     * each child should be a jsx
     * and child's children shouldn't be empty(otherwise there will be two spacers between a 0px width element)
     */
    return React.isValidElement(child) && childrenValid(child);
  });
};

/**
 * Support React.Fragment and array as children
 */
const flatChildren = (children: any) => {
  return children.reduce((acc: any[], child: any) => {
    if (Array.isArray(child)) {
      return [...acc, ...flatChildren(child)];
    }
    if (child?.type === React.Fragment) {
      return [
        ...acc,
        ...flatChildren(
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

  return order.reduce((acc: any[], key: string) => {
    // allow the same typeKey
    const child = children.filter((child: any) => child?.props.typeKey === key);
    if (child.length > 0) {
      return [...acc, ...child];
    }

    return acc;
  }, []);
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
    orderChildren(
      filterValidElements(flatChildren(Array.isArray(children) ? children : [children])),
      config
    ),
    spacerWide(settings, spacingSize),
    config
  );
};

export default useInsertSpacer;
