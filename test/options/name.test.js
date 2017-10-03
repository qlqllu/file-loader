import webpack from '../helpers/compiler';
import { loaders } from '../helpers/stats';

test('name', async () => {
  const config = {
    loader: {
      test: /(png|jpg|svg)/,
      options: {
        name: '[hash].[ext]',
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
