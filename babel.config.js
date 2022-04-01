module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
        },
      ],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "~presentation": "./presentation",
            "~components": "./components",
            "~domain": "./domain",
            "~data": "./data",
            "~assets": "./assets",
          },
        },
      ],
    ],
  };
};
