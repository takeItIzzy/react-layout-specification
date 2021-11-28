import * as React from 'react';
import useElementConfig from '@/hooks/useElementConfig';
import useInsertSpacer from '@/hooks/useInsertSpacer';
import dict from '@/utils/dict';
import { IComponentBaseProps } from './index.types';

const Wrapper: React.FC<IComponentBaseProps> = (props) => {
  const { children, typeKey } = props;

  const config = useElementConfig(typeKey);

  const childrenWithSpacer = useInsertSpacer(children, config);

  if (!config) {
    return <div>{children}</div>;
  }

  const { direction, align } = config;

  const className = () => {
    const flexDirection = direction
      ? dict(
          {
            row: () => 'flex-row',
            column: () => 'flex-col',
          },
          direction
        )
      : '';

    const justifyContent = align
      ? dict(
          {
            start: () => 'justify-start',
            end: () => 'justify-end',
          },
          align
        )
      : '';
    return `flex ${flexDirection} ${justifyContent}`;
  };

  return <div className={className()}>{childrenWithSpacer}</div>;
};

export default Wrapper;
