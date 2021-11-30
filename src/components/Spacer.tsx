import * as React from 'react';
import { IElementDirection } from '@/providers/rlsProvider.types';
import { FULL_SPACER } from '@/constants';

interface ISpacerProps {
  direction?: IElementDirection;
  size: string;
}

const Spacer = (props: ISpacerProps) => {
  const { direction, size } = props;

  return (
    <div
      className="inline-block"
      style={
        size === FULL_SPACER
          ? {
              flex: 1,
            }
          : {
              [direction === 'column' ? 'height' : 'width']: size,
            }
      }
    />
  );
};

export default Spacer;
