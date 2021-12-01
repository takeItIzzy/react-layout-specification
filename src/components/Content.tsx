import * as React from 'react';
import { IComponentBaseProps } from '@/components/index.types';

const Content: React.FC<IComponentBaseProps> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Content;
