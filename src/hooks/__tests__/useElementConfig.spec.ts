import { renderHook } from '@testing-library/react-hooks';
import useElementConfig from '../useElementConfig';
import wrapper from './wrapper';

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
      wrapper: wrapper([element]),
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
      wrapper: wrapper([element]),
    });
    expect(spy).toHaveBeenCalledWith('Theme with typeKey buttonGroup not found');
    expect(result.current).toBeUndefined();
  });
});
