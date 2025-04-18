const env = process.env.APP_ENV || "development";
const removeConsolePlugin = [
  "transform-remove-console",
  {
    exclude: ["error", "warn"],
  },
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: `.env.${env}`,
          allowUndefined: true,
        },
      ],
      ...(env === "production" ? [removeConsolePlugin] : []),
      "react-native-reanimated/plugin",
    ],
  };
};
