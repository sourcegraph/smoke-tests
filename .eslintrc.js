module.exports = {
  extends: ['@sourcegraph/eslint-config'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
    project: ['./packages/**/tsconfig.json'],
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
}
