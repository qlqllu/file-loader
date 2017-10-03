import webpack from '../helpers/compiler';
import { loaders } from '../helpers/stats';

describe('useRelativePath', () => {
  test('- this.options.context', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          useRelativePath: true,
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

  test('- options.context', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          options: {
            context: './relative/',
            useRelativePath: true,
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
