const config = {
  ci: {
    collect: {
      url: [
        'https://sourcegraph.com',
        'https://sourcegraph.com/search?q=repo:sourcegraph/smoke-tests-test-repository+file:index.js',
        'https://sourcegraph.com/github.com/sourcegraph/smoke-tests-test-repository',
        'https://sourcegraph.com/github.com/sourcegraph/smoke-tests-test-repository/-/blob/index.js',
      ],
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}

module.exports = config
