import * as React from 'react';
import { IComponentBaseProps } from '@/components/index.types';
import useElementConfig from '@/hooks/useElementConfig';
import trimClassName from '@/utils/trimClassName';

const Content: React.FC<IComponentBaseProps> = (props) => {
  const { children, className: propClassName, typeKey } = props;

  const config = useElementConfig(typeKey);

  const { className: configClassName } = config ?? {};
  return (
    <div className={trimClassName(`${propClassName ?? ''} ${configClassName ?? ''}`)}>
      {children}
    </div>
  );
};

export default Content;
