import loader from '../src';
import CJSLoader from '../src/cjs';

describe('cjs', () => {
  it('should export loader', () => {
    expect(CJSLoader).toEqual(loader);
  });

  it('should export `raw` flag', () => {
    expect(CJSLoader.raw).toEqual(true);
  });
});
