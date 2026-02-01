module.exports = function (api) {
  api.cache(true);
  return {
    // Expo SDK 50+ already includes Expo Router Babel setup via `babel-preset-expo`.
    // `nativewind/babel` is a *preset* (it returns `{ plugins: [...] }`), so it must be in `presets`, not `plugins`.
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: [],
  };
};

