module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "airbnb-base",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    // 들여쓰기 깊이 제한
    "max-depth": ["error", 2],
    //ESLint가 Prettier의 포매팅 규칙을 오류로 처리
    "prettier/prettier": "error",
    // 함수의 매개변수 개수 제한
    //'max-params': ['error', 3],
    // // 함수의 길이 제한
    //'max-lines-per-function': ['error', { max: 10 }],
  },
};
