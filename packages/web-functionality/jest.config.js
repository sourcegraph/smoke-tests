module.exports = {
  preset: 'jest-puppeteer',
  testResultsProcessor: 'jest-junit',
  testMatch: ['<rootDir>/lib/**/*.test.js'],

  /**
   * Note the following config is required to support running jest as a CLI.
   * Jest doesn't support running tests in `node_modules` by default.
   * This is a problem as this CLI is installed within node_modules itself.
   *
   * Issue: https://github.com/facebook/jest/issues/2145
   * This is fixed in Jest v.28, we can migrate to that once it is fully available.
   * Until then we need to stay on Jest v.25, as support was dropped in versions 26 and 27.
   */
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  haste: {
    providesModuleNodeModules: ['.*'],
  },
}
