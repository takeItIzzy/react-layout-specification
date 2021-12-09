import { IElement } from '@/providers/rlsProvider.types';
import RLSProvider from '../../providers/RLSProvider';

const wrapper =
  (elements: IElement[]) =>
  ({ children }: any) =>
    (
      <RLSProvider
        themes={{
          settings: {
            space: {
              value: 4,
              unit: 'px',
            },
          },
          elements,
        }}
      >
        {children}
      </RLSProvider>
    );

export default wrapper;
