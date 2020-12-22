module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    echarts: "readonly"
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": "off", // 在打包阶段使用 Terser 对 console 和 debugger 进行统一清理，此处不再检测
    "no-debugger": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-var-requires": "off"
  }
};
