module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin']
  };
};

// module.exports = {
//   presets: ['@babel/preset-env', '@babel/preset-react'],
//   env: {
//     test: {
//       plugins: ["@babel/plugin-transform-runtime"]
//     }
//   }
// };