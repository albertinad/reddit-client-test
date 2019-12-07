module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          '@app': './src/app',
          '@tests': './tests',
          '@components': './src/components',
        },
      },
    ],
  ],
};
