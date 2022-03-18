module.exports = {
  preset: 'jest-puppeteer',
  haste: {
    providesModuleNodeModules: ['.*'],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
}
