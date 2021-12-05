import RLSProvider from '@/providers/RLSProvider';
import { IElement } from '@/providers/rlsProvider.types';
import { renderHook } from '@testing-library/react-hooks';
import useElementConfig from '../useElementConfig';

const wrapper =
  (element: IElement) =>
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
          elements: [element],
        }}
      >
        {children}
      </RLSProvider>
    );

describe('hook useElementConfig test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct config', () => {
    const element = {
      typeKey: 'toolbar',
      splitAt: 'search',
      spacing: 3,
    };
    const { result } = renderHook(() => useElementConfig('toolbar'), {
      wrapper: wrapper(element),
    });
    expect(result.current).toEqual(element);
  });

  it('should console error when passed the wrong argument', () => {
    const element = {
      typeKey: 'toolbar',
      splitAt: 'search',
      spacing: 3,
    };
    const spy = jest.spyOn(console, 'error');
    const { result } = renderHook(() => useElementConfig('buttonGroup'), {
      wrapper: wrapper(element),
    });
    expect(spy).toHaveBeenCalledWith('Theme with typeKey buttonGroup not found');
    expect(result.current).toBeUndefined();
  });
});
