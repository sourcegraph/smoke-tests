module.exports = {
  preset: 'jest-puppeteer',
  haste: {
    providesModuleNodeModules: ['.*'],
  },
  testMatch: ['<rootDir>/lib/**/*.test.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  testResultsProcessor: 'jest-junit',
}
