module.exports = {
  parser: "babel-eslint",
  extends: ["react-app", "plugin:react/recommended", "plugin:prettier/recommended"],
  plugins: ["react-hooks"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/prop-types": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-console": 1,
    "react-hooks/rules-of-hooks": 1,
    "react-hooks/exhaustive-deps": 1,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: [["@", "./src"]],
    },
  },
};