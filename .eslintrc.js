/* eslint-env node */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "p5js", "p5js/sound"],
  overrides: [],
  globals: {
    partyConnect: "readonly",
    partyLoadShared: "readonly",
    partySetShared: "readonly",
    partyWatchShared: "readonly",
    partyIsHost: "readonly",
    partyLoadMyShared: "readonly",
    partyLoadGuestShareds: "readonly",
    partySubscribe: "readonly",
    partyUnsubscribe: "readonly",
    partyEmit: "readonly",
    partyToggleInfo: "readonly",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "prefer-const": ["error"],
    "no-var": ["error"],
  },
};
