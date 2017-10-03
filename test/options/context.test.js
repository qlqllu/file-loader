import webpack from '../helpers/compiler';
import { loaders } from '../helpers/stats';


test('context', async () => {
  const config = {
    path: 'context',
    loader: {
      test: /(png|jpg|svg)/,
      options: {
        context: `${__dirname}`,
      },
    },
  };

  // const options = { emit: true };

  const stats = await webpack('./file.js', config /* , options */);
  const { err, src, map, meta } = loaders(stats, 1);

  expect(err).toMatchSnapshot();
  expect(src).toMatchSnapshot();
  expect(map).toMatchSnapshot();
  expect(meta).toMatchSnapshot();
});
