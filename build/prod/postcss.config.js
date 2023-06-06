module.exports = {
  plugins: {
    'postcss-import': true,
    'postcss-mixins': true,
    'postcss-cssnext': {
      'browsers': 'last 2 versions'
    },
    'postcss-inline-svg': {
      path: 'public/'
    },
    'rucksack-css': true,
    'postcss-flexbox': true,
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propWhiteList: [],
      mediaQuery: true,
      replace: true
    },
    'css-mqpacker': {
      sort: true
    }
  }
}
