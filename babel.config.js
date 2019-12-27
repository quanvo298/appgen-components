module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
    '@babel/plugin-transform-runtime',
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            {
              removeAttrs: { attrs: '(data-name)' },
            },
            {
              prefixIds: {
                prefixIds: true,
                prefixClassNames: false,
              },
            },
          ],
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
