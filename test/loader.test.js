import webpack from './helpers/compiler';
import { loaders } from './helpers/stats';


test('defaults', async () => {
  const config = {
    loader: {
      test: /(png|jpg|svg)/,
      options: {},
    },
  };

  const stats = await webpack('./file.js', config);
  const { err, src, map, meta } = loaders(stats, 1);

  expect(err).toMatchSnapshot('errors');
  expect(src).toMatchSnapshot('result');
  expect(map).toMatchSnapshot('sourcemap');
  expect(meta).toMatchSnapshot('metadata');
});
