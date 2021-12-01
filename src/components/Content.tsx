import * as React from 'react';
import { IComponentBaseProps } from '@/components/index.types';

const Content: React.FC<IComponentBaseProps> = (props) => {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
};

export default Content;
