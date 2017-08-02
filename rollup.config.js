const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'src/pubsub.js',
  format: 'umd',
  moduleName: 'pubsub',
  dest: 'dist/pubsub.js',
  plugins: [
    babel({}),
  ],
};
