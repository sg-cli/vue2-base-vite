module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue','stylelint-config-rational-order'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-empty-source': null, //.vue文件是否能有空style标签
  }
};