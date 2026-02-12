module.exports = function (api) {
  api.cache(true);
  return {
<<<<<<< HEAD
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
=======
    presets: ['babel-preset-expo'],
    plugins: [
    'expo-router/babel',
    'react-native-reanimated/plugin'
    ], // MUST be last
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
  };
};
