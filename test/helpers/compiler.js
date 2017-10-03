import path from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';


export default function (fixture, config, options = { emit: false }) {
  // eslint-disable-next-line
  config = {
    devtool: config.devtool || 'sourcemap',
    context: path.resolve(__dirname, '..', 'fixtures'),
    entry: `./${path.basename(fixture)}`,
    output: {
      path: path.resolve(
        __dirname,
        `../results/${config.path ? config.path : ''}`,
      ),
      filename: '[name].bundle.js',
    },
    module: {
      // eslint-disable-next-line
      rules: config.rules || config.loader
        // eslint-disable-next-line
        ? [
          {
            test: config.loader.test || /\.txt$/,
            use: {
              loader: path.resolve(__dirname, '../../src'),
              options: config.loader.options || {},
            },
          },
        ]
        : [],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['runtime'],
        minChunks: Infinity,
      }),
    ].concat(config.plugins || []),
  };
  // eslint-disable-next-line
  options = Object.assign({}, options);

  const compiler = webpack(config);

  if (!options.emit) compiler.outputFileSystem = new MemoryFS();
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    return compiler.run((err, stats) => {
      if (err) reject(err);

      resolve(stats);
    });
  });
}
