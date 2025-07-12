module.exports = {
    "root" : true,
    "extends": "eslint-config-vipul-base",
    "rules": {
      // Overrides
      "func-style": "off",
      "max-len": ["error", 500, { "ignoreUrls": true }],
      "camelcase": ["error", { "properties": "never", "ignoreDestructuring": true }],
      "no-useless-catch": "off",
      "require-atomic-updates": "off",
      "no-unused-vars": ["error", { "ignoreRestSiblings": true }]
    },
    "env": {
      "commonjs": true,
      "node": true
    },
    // Rules limited to specific locations
    "overrides": []
  }
  