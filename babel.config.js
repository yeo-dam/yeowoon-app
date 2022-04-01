module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "~presentation": "./presentation",
            "~domain": "./domain",
            "~data": "./data",
            "~asset": "./assets",
          },
        },
      ],
    ],
  };
};
