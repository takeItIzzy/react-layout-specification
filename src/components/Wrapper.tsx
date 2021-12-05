import * as React from 'react';
import useElementConfig from '@/hooks/useElementConfig';
import useInsertSpacer from '@/hooks/useInsertSpacer';
import dict from '@/utils/dict';
import trimClassName from '@/utils/trimClassName';
import { IComponentBaseProps } from './index.types';

const Wrapper: React.FC<IComponentBaseProps> = (props) => {
  const { className: propClassName, children, typeKey } = props;

  const config = useElementConfig(typeKey);

  const childrenWithSpacer = useInsertSpacer(children, config);

  if (!config) {
    return <div>{children}</div>;
  }

  const { direction, align, className: configClassName } = config;

  const classNames = () => {
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
    return trimClassName(
      `flex ${configClassName ?? ''} ${flexDirection} ${justifyContent} ${propClassName ?? ''}`
    );
  };

  return <div className={classNames()}>{childrenWithSpacer}</div>;
};

export default Wrapper;
