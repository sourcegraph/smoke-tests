# smoke-tests [DRAFT]

This repository is just a proposal for basic smoke tests, which could be plugged in [Cloud deploy pipeline](https://buildkite.com/sourcegraph/deploy-sourcegraph-cloud) to ensure basic happy paths are working (or used on schedule).

[CodeceptJS](https://codecept.io/) with [Puppeter helper](https://codecept.io/helpers/Puppeteer/) was used, just b/c it is quite easy to replace helper to support more browsers at any point.

## 1. Install
```
yarn install
```

## 2. Run tests
```
SHOW_BROWSER=true SG_URL=https://sourcegraph.com npx codeceptjs run --steps
```