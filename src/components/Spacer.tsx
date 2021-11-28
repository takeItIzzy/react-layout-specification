import * as React from 'react';
import { IElementDirection } from '@/providers/rlsProvider.types';

interface ISpacerProps {
  direction?: IElementDirection;
  size: string;
}

const Spacer = (props: ISpacerProps) => {
  const { direction, size } = props;

  return (
    <div
      className="inline-block"
      style={{
        [direction === 'column' ? 'height' : 'width']: size,
      }}
    />
  );
};

export default Spacer;
