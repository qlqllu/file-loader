import webpack from '../helpers/compiler';
import { loaders } from '../helpers/stats';

describe('outputPath', () => {
  test('- {String}', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          outputPath: '/test/test',
        },
      },
    };

    const stats = await webpack('./file.js', config);
    const { err, src, map, meta } = loaders(stats, 1);

    expect(err).toMatchSnapshot();
    expect(src).toMatchSnapshot();
    expect(map).toMatchSnapshot();
    expect(meta).toMatchSnapshot();
  });

  test('- {Function}', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          outputPath(url) {
            return `test/${url}`;
          },
        },
      },
    };

    const stats = await webpack('./file.js', config);
    const { err, src, map, meta } = loaders(stats, 1);

    expect(err).toMatchSnapshot();
    expect(src).toMatchSnapshot();
    expect(map).toMatchSnapshot();
    expect(meta).toMatchSnapshot();
  });
});
