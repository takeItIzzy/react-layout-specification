import * as React from 'react';
import useThemes from '@/hooks/useThemes';
import { IComponentBaseProps } from './index.types';
import useInsertSpacer from '@/hooks/useInsertSpacer';

const RLSWrapper: React.FC<IComponentBaseProps> = (props) => {
  const { children, typeKey } = props;

  const config = useThemes(typeKey);

  return <div>{useInsertSpacer(children)}</div>;
};

export default RLSWrapper;
