module.exports = {
  root: true,
  plugins: ["import"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript", // if you're using TypeScript
  ],
  rules: {
    "import/order": [
      "warn",
      {
        groups: [
          "builtin", // React, React Native, Node.js built-ins
          "external", // npm packages
          "internal", // Your aliases (e.g., @components, @utils)
          ["parent", "sibling", "index"], // Relative paths
        ],
        pathGroups: [
          {
            pattern: "react-native",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
