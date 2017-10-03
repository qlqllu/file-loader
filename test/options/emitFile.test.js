import loader from '../../src';

const run = function run(resourcePath, query, content = new Buffer('1234')) {
  let result = false;

  const context = {
    resourcePath,
    query: `?${query || ''}`,
    options: {
      context: '/this/is/the/context',
    },
    emitFile() {
      result = true;
    },
  };

  loader.call(context, content);

  return result;
};

describe('emitFile', () => {
  it('{Boolean} - true - (default)', () => {
    expect(run('file.txt', '')).toBe(true);
  });

  it('{Boolean} - false', () => {
    expect(run('file.txt', 'emitFile=false')).toBe(false);
  });
});
